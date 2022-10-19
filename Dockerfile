FROM  node:16.17.1-alpine3.15 AS builder

WORKDIR /app

COPY . .

EXPOSE 3000
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .

CMD ["nginx", "-g", "daemon off;"]