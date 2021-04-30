# This defines our starting point
FROM node:12-alpine as build-step
RUN apk update && apk add bash
RUN npm install -g @angular/cli@10.1.7
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app
EXPOSE 4200
CMD ng serve --host 0.0.0.0 --poll 5000