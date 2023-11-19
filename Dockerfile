FROM node:18

WORKDIR /usr/src/app
COPY server/package*.json ./server/
COPY client/package*.json ./client/

WORKDIR /usr/src/app/server
RUN npm install

WORKDIR /usr/src/app/client
RUN npm install

WORKDIR /usr/src/app
COPY server/ ./server/
COPY client/ ./client/

RUN npm run build

WORKDIR /usr/src/app/server
#DEVELOPMENT
EXPOSE 3000  
#PRODUCTION
EXPOSE 8080  

WORKDIR /usr/src/app/server
CMD ["npm", "start"]
