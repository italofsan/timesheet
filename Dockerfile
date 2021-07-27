FROM node:15-alpine AS builder

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install --silent

FROM node:lts-alpine

ENV NODE_ENV production

ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY . /usr/src/app

CMD ["npm", "start"]