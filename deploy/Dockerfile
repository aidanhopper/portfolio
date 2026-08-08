# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests & install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files and build production static bundle
COPY . .
RUN npm run build

# Production Nginx Stage
FROM nginx:alpine AS runner

# Copy custom Nginx configuration with SPA fallback routing
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
