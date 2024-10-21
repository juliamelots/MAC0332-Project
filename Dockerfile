# --- FRONTEND ---
# Specify the base image for React fontend
FROM node:23-alpine3.19 AS frontend-build

# Set working directory
WORKDIR /app/frontend

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY frontend/ .

# Build the React app
RUN npm run build

# --- BACKEND ---
# Specify the base image for Ktor backend
FROM gradle:8.10.2-jdk17 AS backend-build

WORKDIR /app/backend

# Copy the backend's build.gradle and settings.gradle
COPY backend/build.gradle.kts backend/settings.gradle.kts ./

# Copy the entire backend source code
COPY backend/ .

# Build the Ktor app (this will create the jar file)
RUN gradle installDist

# --- PRODUCTION IMAGE ---
FROM openjdk:17-jdk-slim AS production

WORKDIR /app

# Copy the Ktor app from the backend build image
COPY --from=backend-build /app/backend/build/install/com.backend.rota-da-cultura /app/backend

# Copy the frontend build output from the frontend build stage
COPY --from=frontend-build /app/frontend/dist /app/backend/resources/static

# Set the entry point to run the Ktor application
CMD ["/app/backend/bin/com.backend.rota-da-cultura"]
