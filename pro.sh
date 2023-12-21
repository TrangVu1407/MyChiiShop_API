#!/bin/bash
git checkout -- .
git pull
cp server/Dockerfile
cp docker-compose.yml
# Export DOCKER_BUILDKIT=0
docker-compose build
docker-compose up -d
