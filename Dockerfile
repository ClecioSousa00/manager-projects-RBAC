FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 3333

CMD ["npm", "run", "dev"]
