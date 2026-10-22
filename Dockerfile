# Container for the public site (apps/web), for Google Cloud Run (TDD §3).
# Build:  docker build -t tanmaysaachi-web .
# Run:    docker run -p 8080:8080 tanmaysaachi-web

FROM node:22-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Install from the lockfile first so dependency layers cache between builds.
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:22-slim AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0
# Standalone output: only the files the server needs, no dev dependencies.
COPY --from=build --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=build --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=node:node /app/apps/web/public ./apps/web/public
USER node
EXPOSE 8080
CMD ["node", "apps/web/server.js"]
