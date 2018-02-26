# Docker basics

Prepared Docker file with nginx image and static single page application.

Steps to run:

1. Run `docker build -t docker-basic-image .`
2. Run `docker run --name docker-basic -p 3000:80 -d docker-basic-image`
3. Run `docker ps`
4. Go to `localhost:3000`
5. Run `docker stop docker-basic`
6. Run `docker start docker-basic`
