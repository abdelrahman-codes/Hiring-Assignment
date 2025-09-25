# Use the official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY ./ .

# Expose the port that Express will run on
EXPOSE 8080

# Run the Express server
CMD ["npm", "start"]
