FROM node:20-alpine

# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
