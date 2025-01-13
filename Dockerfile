
FROM node:alpine


WORKDIR /sequelizeapp

COPY package*.json ./


RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD ["sh","-c","npm run db:migrate && nodemon ./index.js"]



