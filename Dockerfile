FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 4000
CMD npx nodemon ./bin/www