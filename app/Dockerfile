# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Install build dependencies for the canvas module
RUN apt-get update && apt-get install -y \
    build-essential \
    python \
    libcairo2-dev \
    libpango1.0-dev

# Rebuild the canvas module
RUN npm rebuild canvas

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your backend service runs on (e.g., 8080)
EXPOSE 3000

# Define the command to run your backend application
CMD ["npm", "start"]
