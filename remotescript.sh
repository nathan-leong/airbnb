#!/bin/bash  
sudo service docker start
echo "Building build image"
sudo docker build -t airbnb .
echo "Build Complete, running app"
sudo docker run -d --name airbnbcontainer -p 80:80 airbnb