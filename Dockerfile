FROM node:16 as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.25
COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]