FROM node:20

WORKDIR /app

COPY ./my-react-app/ /app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]