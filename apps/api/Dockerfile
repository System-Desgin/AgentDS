# Multi-stage build for the AgentDS API.
# Build context is the repo root (see docker-compose.yml: context is `.`).
# node:22-alpine, non-root runtime user, healthcheck on /v1/health.

FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
RUN corepack enable
WORKDIR /app

# ---- Build stage: install everything, build shared + api, prune to prod ----
FROM base AS build
ENV NODE_ENV=development
COPY . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Generate the Prisma client (emitted into src/generated, compiled by nest
# build), build the shared package first (api depends on its compiled output),
# then api.
RUN pnpm --filter api exec prisma generate \
  && pnpm --filter @agentds/shared build \
  && pnpm --filter api build
# Produce a self-contained, production-only deployment of the api package
# (workspace deps are injected as real files, not symlinks).
RUN pnpm --filter api --prod deploy /prod/api

# ---- Runtime stage: minimal, non-root ----
FROM base AS runtime
# openssl: required by Prisma's schema engine (migrate deploy) on alpine.
RUN apk add --no-cache openssl
ENV NODE_ENV=production
ENV PORT=4000
# Content is baked into the image and re-ingested on every boot (PRD F-5).
ENV CONTENT_DIR=/app/content
COPY --from=build --chown=node:node /prod/api /app
COPY --from=build --chown=node:node /app/content /app/content
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/v1/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
# Apply committed migrations, then start; ingest runs on boot inside the app.
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/main.js"]
