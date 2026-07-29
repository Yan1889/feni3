FROM node:26 AS builder
WORKDIR /build-dir/
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.30.4
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /build-dir/dist/ /var/www/html/
