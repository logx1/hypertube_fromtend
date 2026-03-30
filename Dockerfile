FROM node:20


WORKDIR /app/my-react-app


COPY ./my-react-app/package*.json ./


RUN npm install


# COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]