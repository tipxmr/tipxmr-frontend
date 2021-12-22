FROM node:current-alpine

WORKDIR /app

COPY . .
RUN npm install --legacy-peer-deps

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 8080