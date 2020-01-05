Currently hosted on http://fakeairbnb.tk/

This is an airbnb clone hosted on an ec2, connected with a postgres RDS
As port running on 80 may need sudo in dev.

CICD using circleci runs the build.sh file which sends a command to the EC2 to pull down this repo, and rebuild using the remotescript.sh


Database config:
CREATE DATABASE postgres;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

All other tables will be created through the initialiseModels middleware.