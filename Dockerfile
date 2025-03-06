FROM node:20 AS app

WORKDIR /app

RUN apt-get update && apt-get install -y openssl libssl-dev

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm i --frozen-lockfile

COPY . .

EXPOSE 3000

RUN npx prisma migrate

RUN npm run build

CMD [ "npm", "run", "start" ]