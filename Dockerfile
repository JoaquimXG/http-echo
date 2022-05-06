FROM ubuntu:latest

RUN apt update && apt install -y nodejs npm

RUN git clone 'https://github.com/JoaquimXG/http-echo.git' /home/ubuntu/http-echo

WORKDIR /home/ubuntu/http-echo

RUN npm ci

CMD ["npm", "run", "prod"]
