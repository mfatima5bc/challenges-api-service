FROM node:22.11.0

WORKDIR /usr/challenges-app

# Copy dependency definitions
COPY package.json ./
# COPY package-lock.json ./package-lock.json
COPY prisma ./prisma/

RUN npm i

COPY . .

RUN npx run prisma generate

RUN npx run prisma migrate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]