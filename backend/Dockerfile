FROM node:13-alpine

COPY package.json package-lock.json ./
RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]