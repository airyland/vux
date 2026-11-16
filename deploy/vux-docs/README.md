# VUX v2 documentation deployment

The root Dockerfile generates the original bilingual Ream documentation and serves the static output on port 8080. Vibeploy builds this branch and uses `/healthz` for readiness. The site serves the existing locale and component URLs. The root redirects to `/zh-CN/`. Requests on `docs.vux.li` redirect to `doc.vux.li`, preserving the path and query.

The build uses the locked npm tarballs and runs the original component metadata generator. Component contributor counts depend on the Git history available during generation. Interactive demos still load from `https://vux.li/demos/v2/`.

## Changelog

- 2026-11-15: Added the Vibeploy image, repaired legacy build dependencies and generated routes, and handled missing English component descriptions.
