package main

import (
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"
)

func TestSiteHandler(t *testing.T) {
	root := t.TempDir()
	for name, body := range map[string]string{
		"index.html": "homepage", "demos/v2/index.html": "demo", "asset.js": "123456",
		"no-index/file.txt": "text",
	} {
		file := filepath.Join(root, name)
		if err := os.MkdirAll(filepath.Dir(file), 0755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(file, []byte(body), 0644); err != nil {
			t.Fatal(err)
		}
	}
	handler := siteHandler(os.DirFS(root))
	for _, tc := range []struct {
		method, path, byteRange string
		status                  int
		body, location          string
	}{
		{"GET", "/", "", 200, "homepage", ""},
		{"HEAD", "/", "", 200, "", ""},
		{"GET", "/healthz", "", 200, "ok\n", ""},
		{"GET", "/demos/v2/", "", 200, "demo", ""},
		{"GET", "/demos/v2?v=1", "", 301, "", "/demos/v2/?v=1"},
		{"GET", "//demos/v2", "", 301, "", "/demos/v2/"},
		{"GET", "/asset.js", "bytes=1-2", 206, "23", ""},
		{"GET", "/absent", "", 404, "", ""},
		{"GET", "/no-index/", "", 403, "", ""},
		{"GET", "/analytics/script.js", "", 503, "", ""},
		{"POST", "/wemp/send", "", 503, "", ""},
		{"GET", "/werss-api/", "", 503, "", ""},
		{"POST", "/", "", 405, "", ""},
	} {
		t.Run(tc.method+" "+tc.path, func(t *testing.T) {
			req := httptest.NewRequest(tc.method, tc.path, nil)
			if tc.byteRange != "" {
				req.Header.Set("Range", tc.byteRange)
			}
			res := httptest.NewRecorder()
			handler.ServeHTTP(res, req)
			if res.Code != tc.status || res.Header().Get("Location") != tc.location {
				t.Fatalf("status %d, location %q", res.Code, res.Header().Get("Location"))
			}
			if (tc.status < 400 || tc.body != "") && res.Body.String() != tc.body {
				t.Fatalf("body %q, expected %q", res.Body.String(), tc.body)
			}
		})
	}
}
