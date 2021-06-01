FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=proud
COPY . .

CMD ["npm", "start"]