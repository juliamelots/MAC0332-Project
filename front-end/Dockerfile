# --- FRONT-END PROD SETUP ---

# Specify the base image for React fontend
FROM node:18-alpine AS frontend-build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React app
RUN npm run build

# Specify the base image for Nginx
FROM nginx:alpine 

# Copy the built React app from the frontend build image to the Nginx directory
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Expose port 80 to access the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

