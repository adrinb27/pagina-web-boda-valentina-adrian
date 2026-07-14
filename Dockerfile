# syntax=docker/dockerfile:1

# ==========================================================================
# Stage 1 - Build: compile SCSS -> CSS and minify JS with gulp
# ==========================================================================
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build the production assets
COPY . .
RUN npx gulp default

# Assemble a clean directory with only the files needed to serve the site
RUN mkdir -p /site \
    && cp -r index.html css js img fonts video \
          *.png *.ico *.svg manifest.json browserconfig.xml /site/

# ==========================================================================
# Stage 2 - Serve: lightweight nginx static host
# ==========================================================================
FROM nginx:1.27-alpine AS serve

# Port the server listens on inside the container (override at runtime).
ENV PORT=8080

# nginx official image runs envsubst over *.template at startup, so ${PORT}
# in this template is replaced with the value of the PORT env var.
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template

# Copy the built static site from the build stage
COPY --from=build /site /usr/share/nginx/html

# Ensure the served files are world-readable and directories are traversable.
# nginx worker processes drop privileges to the unprivileged "nginx" user, so
# they must be able to read every file. Some hosts (e.g. certain NAS Docker
# engines) apply a restrictive umask to COPY layers, which can strip the read
# bit and cause "open() ... failed (13: Permission denied)" at runtime.
# chmod sets the bits explicitly regardless of the host umask.
RUN chmod -R a+rX /usr/share/nginx/html

# Documents the default port (actual port is controlled by the PORT env var)
EXPOSE 8080

# Basic healthcheck hitting the configured port
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider "http://localhost:${PORT}/" || exit 1

# Uses the default nginx entrypoint (processes templates) and CMD
