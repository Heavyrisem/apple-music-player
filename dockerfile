# Build Stage
FROM node:16 as builder

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build


# Production Stage
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]