FROM --platform=linux/amd64 node:16
#FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
#RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 86
#CMD [ "node", "index.js" ]
CMD [ "npm", "start" ]

