FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY .env* ./
COPY scripts ./scripts
COPY models ./models
COPY lib ./lib

RUN npm install
RUN npm install mongoose bcryptjs next-auth react-error-boundary

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
