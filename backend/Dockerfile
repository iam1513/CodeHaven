FROM ubuntu:20.04

# Set up user
RUN useradd -ms /bin/bash sandbox

# Setup working directory
WORKDIR /home/sandbox

# Update ubuntu machine
RUN apt update && apt upgrade -y

# Intall nano and curl
RUN apt install nano curl -y

# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_19.x |   bash - && \
    apt install -y nodejs

# Configure terminal to display current working directory
RUN echo "PS1='\w'" >> /home/sandbox/.bashrc 
# whats bashrc ? -> All configurations if we are using bash terminal are stored in this file
# \w -> current working directory

# Setup final working directory
WORKDIR /home/sandbox/app