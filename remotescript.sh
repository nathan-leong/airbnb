#!/bin/bash  
sudo service docker start
echo "Building build image"
sudo docker build -t airbnb .
echo "Build Complete, running app"
sudo docker run -p 80:80 airbnb