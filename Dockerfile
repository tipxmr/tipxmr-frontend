FROM  mhart/alpine-node:latest

WORKDIR /app

COPY . .
RUN npm install --legacy-peer-deps

RUN mkdir -p node_modules/.cache && chown -Rh $user:$user node_modules/.cache

USER $user

EXPOSE 8080
CMD ["npm", "start"]