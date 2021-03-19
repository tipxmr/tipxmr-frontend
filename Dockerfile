FROM node:current-alpine

WORKDIR /usr/local/app

RUN npm install && npm cache clean --force