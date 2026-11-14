FROM scratch
COPY --chmod=0555 vux-web /vux-web
ADD site.tar.gz /site/
USER 65532:65532
EXPOSE 8080
ENTRYPOINT ["/vux-web"]
