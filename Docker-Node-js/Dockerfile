FROM node:18-alpine AS builder

# create non-root user for security
RUN apk add --no-cache openssl && \
    addgroup -S appgroup --gid 2000 && \
    adduser -S appuser --uid 1001 -G appgroup -h /app -s /bin/sh -D && \
    chown -R appuser:appgroup /app

WORKDIR /app

USER appuser

COPY --chown=appuser:appgroup package*.json ./

# install only production deps
RUN npm install --omit=dev --ignore-scripts --prefer-offline && \
    npm cache clean --force

COPY --chown=appuser:appgroup . .

# production image
FROM node:18-alpine

RUN apk add --no-cache curl && \
    find / -xdev -perm +6000 -type f -exec chmod a-s {} \; 2>/dev/null || true && \
    rm -rf /var/cache/apk/* /tmp/*

RUN addgroup -S appgroup --gid 2000 && \
    adduser -S appuser --uid 1001 -G appgroup -h /app -s /bin/sh -D

WORKDIR /app

COPY --from=builder --chown=appuser:appgroup /app/package.json ./
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app ./

# bump memory limit for larger apps
ENV NODE_OPTIONS="--max-old-space-size=4096"

# lock down file permissions
RUN find /app -type d -exec chmod 750 {} \; && \
    find /app -type f -exec chmod 640 {} \;

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/healthz || exit 1

CMD ["node", "--no-experimental-fetch", "index.js"]