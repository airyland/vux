# VUX static site on Vibeploy

The archive is a checksum-verified snapshot of the 1,273 files served by
vux.li. It has no symlinks or special files. Its SHA-256 is
`a913b04677e8f8a1f77b3952957a3c05c95d71953fa08102c898ace62420c119`.

The Dockerfile packages the static Linux executable and the archive from
scratch. BuildKit needs no base image. The service listens on port 8080
and serves `/healthz` for probes. The legacy `/analytics/`, `/wemp/` and
`/werss-api/` routes reply with 503 while their upstreams are unavailable.

Run from this directory to test and regenerate the executable:

```sh
GOTOOLCHAIN=go1.26.11 GO111MODULE=off go test .
GOTOOLCHAIN=go1.26.11 GO111MODULE=off GOOS=linux GOARCH=amd64 CGO_ENABLED=0 \
  go build -trimpath -ldflags='-s -w -buildid=' -o vux-web main.go
```

Use this directory as the Vibeploy build context. The Vibeploy worker
packages the image and stores it in the internal registry.
