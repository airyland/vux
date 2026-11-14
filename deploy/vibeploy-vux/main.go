// VUX serves the archived documentation and demos without network dependencies.
package main

import (
	"errors"
	"io"
	"io/fs"
	"log"
	"net/http"
	"net/url"
	"os"
	"path"
	"strings"
	"time"
)

var legacyResponses = map[string]string{
	"/healthz":                            "ok\n",
	"/ads.txt":                            "google.com, pub-4251327906175578, DIRECT, f08c47fec0942fa0",
	"/vux-loader-anonymous-tracking.html": "thanks",
	"/MP_verify_zCFF7vsWSSxFJYpa.txt":     "zCFF7vsWSSxFJYpa",
}

func siteHandler(site fs.FS) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cleanPath := path.Clean("/" + r.URL.Path)
		switch strings.SplitN(strings.TrimPrefix(cleanPath, "/"), "/", 2)[0] {
		case "analytics", "wemp", "werss-api":
			http.Error(w, "Service unavailable", http.StatusServiceUnavailable)
			return
		}

		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			w.Header().Set("Allow", "GET, HEAD")
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		if body, ok := legacyResponses[cleanPath]; ok {
			contentType := "application/octet-stream"
			if cleanPath == "/ads.txt" {
				contentType = "text/plain"
			}
			w.Header().Set("Content-Type", contentType)
			http.ServeContent(w, r, "", time.Time{}, strings.NewReader(body))
			return
		}

		name := strings.TrimPrefix(cleanPath, "/")
		if name == "" {
			name = "."
		}
		entry, err := fs.Stat(site, name)
		if err != nil {
			fileError(w, r, err)
			return
		}
		if entry.IsDir() {
			index := path.Join(name, "index.html")
			stat, err := fs.Stat(site, index)
			if err != nil {
				if errors.Is(err, fs.ErrNotExist) {
					http.Error(w, "Forbidden", http.StatusForbidden)
					return
				}
				fileError(w, r, err)
				return
			}
			if !strings.HasSuffix(r.URL.Path, "/") {
				target := (&url.URL{Path: cleanPath + "/"}).EscapedPath()
				if r.URL.RawQuery != "" {
					target += "?" + r.URL.RawQuery
				}
				w.Header().Set("Location", target)
				w.WriteHeader(http.StatusMovedPermanently)
				return
			}
			name, entry = index, stat
		} else if strings.HasSuffix(r.URL.Path, "/") {
			http.NotFound(w, r)
			return
		}

		file, err := site.Open(name)
		if err != nil {
			fileError(w, r, err)
			return
		}
		defer file.Close()
		seeker, ok := file.(io.ReadSeeker)
		if !ok {
			http.Error(w, "Cannot read file", http.StatusInternalServerError)
			return
		}
		http.ServeContent(w, r, name, entry.ModTime(), seeker)
	})
}

func fileError(w http.ResponseWriter, r *http.Request, err error) {
	if errors.Is(err, fs.ErrNotExist) {
		http.NotFound(w, r)
		return
	}
	if errors.Is(err, fs.ErrPermission) {
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}
	log.Printf("static file request failed: %v", err)
	http.Error(w, "Cannot read file", http.StatusInternalServerError)
}

func main() {
	server := &http.Server{
		Addr:              ":8080",
		Handler:           siteHandler(os.DirFS("/site")),
		ReadHeaderTimeout: 5 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
	log.Fatal(server.ListenAndServe())
}
