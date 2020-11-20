############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y sudo

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
RUN apt-get install -y nodejs