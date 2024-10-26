# --- BACKEND ---
# Specify the base image for Ktor backend
FROM gradle:8.10.2-jdk17 AS backend-build

WORKDIR /app

# Copy the backend's build.gradle and settings.gradle
COPY build.gradle.kts settings.gradle.kts ./

COPY . .

# Build the Ktor app (this will create the jar file)
RUN gradle installDist

# --- PRODUCTION IMAGE ---
FROM openjdk:17-jdk-slim AS production

WORKDIR /app

# Copy the Ktor app from the backend build image
COPY --from=backend-build /app/build/install/com.backend.rota-da-cultura /app

# Set the entry point to run the Ktor application
CMD ["/app/bin/com.backend.rota-da-cultura"]
