FROM node:22.11.0

WORKDIR /usr/corrections-app

# Copy dependency definitions
COPY package.json ./
COPY package-lock.json ./package-lock.json
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]