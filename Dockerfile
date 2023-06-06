FROM node:lts-alpine

RUN mkdir "backend"

WORKDIR /backend

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY ./src ./src

CMD ["npm", "run", "start:dev"]
