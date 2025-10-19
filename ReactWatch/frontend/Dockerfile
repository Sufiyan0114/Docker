FROM node:18-alpine AS builder

WORKDIR /builds

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /builds/build /usr/share/nginx/html

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /usr/share/nginx/html /var/cache/nginx && \
    chmod -R 755 /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD -f http://localhost || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]