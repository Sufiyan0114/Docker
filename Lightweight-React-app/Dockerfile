FROM node:18-alpine AS build

# create non root user
RUN apk add --no-cache openssl && \
    addgroup -S appgroup --gid 2000 && \
    adduser -S appusr --uid 1001 -G appgroup -h /app -s /bin/sh -D && \
    chown -R appusr:appgroup /app
WORKDIR /app
USER appusr

# bump memory limit for larger apps
ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY --chown=appusr:appgroup package*.json  ./


RUN npm install --omit=dev --ignore-scripts --prefer-offline && \
    npm cache clean --force


COPY --chown=appusr:appgroup . .

RUN npm run build


FROM nginx:stable-alpine

# giving essential permissions to non root user for accessing nginx files
RUN rm -rf /usr/share/nginx/html/*
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appusr && \
    chown -R appusr:appgroup /usr/share/nginx/html && \
    chown -R appusr:appgroup /var/cache/nginx && \
    chown -R appusr:appgroup /var/log/nginx && \
    chown -R appusr:appgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R appusr:appgroup /var/run/nginx.pid

COPY --chown=appusr:appgroup nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build --chown=appusr:appgroup /app/build /usr/share/nginx/html

USER appusr
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]       



# create nginx.conf file in a same folder and add this content: 
    

### or could we use sed command but it's not permenent solution
# RUN sed -i 's/listen\s*80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

## replace with:
    # COPY --chown=appusr:appgroup nginx.conf /etc/nginx/conf.d/default.conf