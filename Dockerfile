FROM node:current-alpine

WORKDIR /usr/app

#COPY package.json .
COPY . .
RUN npm install --legacy-peer-deps

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .
