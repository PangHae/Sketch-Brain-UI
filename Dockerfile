FROM node:16.15.1

RUN mkdir /app

WORKDIR /app

COPY . .

RUN yarn

RUN yarn run build

EXPOSE 3000

CMD yarn start