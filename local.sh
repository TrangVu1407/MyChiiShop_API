#!/bin/bash
cp server/Dockerfile
cp docker-compose.yml
# Export DOCKER_BUILDKIT=0
docker-compose build
docker-compose up -d
