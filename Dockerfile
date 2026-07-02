FROM node:20

WORKDIR /app

COPY ./my-react-app/ /app

COPY ./start.sh /

RUN npm install

EXPOSE 3000

CMD ["bash", "/start.sh"]
