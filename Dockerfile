# Production-ready, ultra-lightweight NGINX image
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom NGINX server configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website files into NGINX web root
COPY . /usr/share/nginx/html/

# Remove Docker and Git configuration files from container web root
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/docker-compose.yml \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/.dockerignore \
          /usr/share/nginx/html/.gitignore

# Expose HTTP port
EXPOSE 80

# Health check to ensure NGINX is actively responding
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
