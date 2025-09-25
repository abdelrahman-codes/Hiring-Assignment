# Use the official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY ./ .

# Expose the port that Next.js will run on (default port 3000 for Next.js)
EXPOSE 3000

# Set environment variable for development mode (optional, but good practice)
ENV NODE_ENV=development

# Run Next.js in development mode
CMD ["npm", "run", "dev"]
