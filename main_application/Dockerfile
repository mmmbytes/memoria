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

ARG REACT_APP_LOGIN_URL
ARG REACT_APP_LOGOUT_URL

ENV REACT_APP_LOGIN_URL=$REACT_APP_LOGIN_URL
ENV REACT_APP_LOGOUT_URL=$REACT_APP_LOGOUT_URL

WORKDIR /usr/src/app/client
RUN npm run build

WORKDIR /usr/src/app/server
#PRODUCTION
EXPOSE 8080  
#DEVELOPMENT
EXPOSE 3000  

WORKDIR /usr/src/app/server
CMD ["npm", "start"]
