# Base image
FROM node:18

# Create app directory
WORKDIR /app
    
# Copy files
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port and start app
EXPOSE 3000
CMD [ "npm", "start" ]
