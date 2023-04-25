FROM node:alpine
WORKDIR /front-end
COPY package*.json ./
COPY . .
RUN npm i
RUN npm run build
# EXPOSE 3000
CMD ["npm", "run", "dev"]
