#!/bin/bash

docker kill $(docker ps | grep fab | awk '{print $1}')
docker container prune
