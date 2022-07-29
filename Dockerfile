FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# install app dependencies
# a wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# update npm
RUN npm i -g npm

# building for prod so using produiction flag
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
