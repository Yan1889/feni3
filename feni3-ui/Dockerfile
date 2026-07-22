FROM node:latest AS builder
WORKDIR /build-dir
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=builder /build-dir/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8081
