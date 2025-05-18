FROM node:alpine

WORKDIR /sequelizeapp

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["sh","-c","npm run db:migrate && nodemon ./server.js"]



