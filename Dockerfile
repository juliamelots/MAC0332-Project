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

# Set the entry point to run the Ktor application
CMD ["/app/backend/bin/com.backend.rota-da-cultura"]
