# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# # Build the Angular app
# RUN npm run build

# Expose port 3003 for the container
EXPOSE 4200

# Start the app by running the Angular server
CMD ["npm" , "start"]
