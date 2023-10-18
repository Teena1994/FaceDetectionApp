# Use an official Nginx image as a parent image
FROM nginx:alpine

# Copy the built Vue.js project to the default Nginx web root directory
COPY ./dist /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 8080

# No need for CMD as the Nginx image handles this automatically
