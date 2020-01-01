#!/bin/bash  
git pull origin master

sudo docker stop airbnbcontainer
sudo docker rm airbnbcontainer
#sudo service docker start
echo "Building build image"
sudo docker build --rm -t airbnb .
echo "Build Complete, running app"
sudo docker run --name airbnbcontainer -p 80:80 airbnb