#!/bin/sh

# Basic setup for HTTP echo server

apt-get update
apt-get install nodejs -y
apt-get install npm -y


git clone https://github.com/JoaquimXG/http-echo.git

cd http-echo

npm run prod 8080