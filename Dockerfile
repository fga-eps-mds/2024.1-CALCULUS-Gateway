FROM node:22-alpine as development

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]
