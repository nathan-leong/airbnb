FROM tiangolo/node-frontend:10 
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "prod" ]