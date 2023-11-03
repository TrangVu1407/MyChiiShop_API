FROM node:16
WORKDIR /usr/app
COPY package.json ./
RUN npm install

RUN yarn global add knex knex-migrate
# CMD ["npm", "run", "dev"]