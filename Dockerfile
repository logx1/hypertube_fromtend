FROM node:20

WORKDIR /app

COPY ./my-react-app/ /app

COPY ./start.sh /

RUN npm install

EXPOSE 3000

# RUN npm run build

CMD ["bash", "/start.sh"]
