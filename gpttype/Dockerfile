FROM node:25-alpine3.21

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm","run","build" ]