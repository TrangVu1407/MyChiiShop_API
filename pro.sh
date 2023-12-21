#!/bin/bash
cp server/Dockerfile
cp docker-compose.yml

docker-compose build
docker-compose up
