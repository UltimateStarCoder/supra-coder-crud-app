FROM node:22.13.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install mongoose bcryptjs next-auth

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
