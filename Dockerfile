FROM node:current-alpine

WORKDIR /usr/local/app

COPY package*.json ./
COPY .env.example ./
COPY ./public ./public
RUN npm install && npm cache clean --force

COPY ./src ./src