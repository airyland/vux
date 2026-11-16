FROM registry.vibeploy.internal:5000/vibeploy/base-node@sha256:3c647c8ef98887da5d0dc8a37697ee6ded56e253ff7033891770885aab0a685c AS build
WORKDIR /build
COPY deploy/vux-docs/package*.json deploy/vux-docs/
RUN npm --prefix deploy/vux-docs ci --ignore-scripts --no-audit --no-fund
COPY docs/package.json docs/yarn.lock docs/
RUN cd docs && npm exec --yes --package=yarn@1.22.22 -- yarn install --frozen-lockfile --ignore-scripts --non-interactive
COPY package.json ./
COPY build/ build/
COPY src/ src/
COPY docs/ docs/
RUN NODE_PATH=/build/deploy/vux-docs/node_modules:/build/docs/node_modules npm run doc:build
RUN cd docs && NODE_OPTIONS=--openssl-legacy-provider npm run gen
RUN cp docs/favicon.ico docs/sitemap.txt docs/.ream/dist/ \
    && rm docs/.ream/dist/vue-ssr-*.json \
    && find docs/.ream/dist -type f -name '*.map' -delete \
    && test -s docs/.ream/dist/zh-CN/index.html \
    && test -s docs/.ream/dist/en/components/x-button.html \
    && npm --prefix deploy/vux-docs prune --omit=dev --ignore-scripts --no-audit --no-fund

FROM registry.vibeploy.internal:5000/vibeploy/base-node@sha256:3c647c8ef98887da5d0dc8a37697ee6ded56e253ff7033891770885aab0a685c
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /build/deploy/vux-docs/node_modules ./node_modules
COPY deploy/vux-docs/server.mjs ./
COPY --from=build /build/docs/.ream/dist /site
USER 65532:65532
EXPOSE 8080
CMD ["node", "server.mjs"]
