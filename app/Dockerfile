# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Install system-level dependencies for the "canvas" package
RUN apt-get update && apt-get install -y \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev

# Copy the rest of the application source code to the container
COPY . .

# Expose the port your application will run on (adjust this if necessary)
EXPOSE 3000

# Define the command to run your application
CMD [ "npm", "start" ]
