# inspektre CLI
FROM node:15
RUN apt-get update && apt-get install -y yarn
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn build
EXPOSE 4000
CMD ["yarn", "start", "-h"]