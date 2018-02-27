# Basic Express.js

Steps to reproduce:

### Node app

1. Install `node` and `yarn|npm`
2. Install `yarn|npm -g install express-generator`
3. Generate `express -H express-basic`
4. Install deps `cd express-basic/; and yarn|npm install`
5. Run the app `DEBUG=express-basic:* npm start`
6. Install `npm install -g nodemon`
7. Run `nodemon start` for reloading in development

### Docker image

6. Run `docker build -t node-docker-image .`
7. Run `docker run -p 8080:8080 -d --name node-docker node-docker-image`
8. Run `docker ps`
9. Go to `localhost:8080`
10. Run `docker stop node-docker`
10. Run `docker start node-docker`
