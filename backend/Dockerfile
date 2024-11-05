# --- BACKEND BUILD SETUP ---
# Stage 1: Build the Ktor application
FROM gradle:8.10.2-jdk17 AS backend-build

WORKDIR /app

# Copy build files for dependency resolution
COPY build.gradle.kts settings.gradle.kts ./

# Copy the backend project source files
COPY . .

# Build the Ktor app with Gradle's installDist task
RUN gradle installDist

# --- PRODUCTION IMAGE SETUP ---
# Stage 2: Production image with a smaller base
FROM openjdk:17-jdk-slim AS production

WORKDIR /app

# Copy the built Ktor application from the previous stage
COPY --from=backend-build /app/build/install/com.backend.rota-da-cultura /app

# Expose the port Ktor runs on (default 8080)
EXPOSE 8080

# Set the entrypoint for running the Ktor application
CMD ["/app/bin/com.backend.rota-da-cultura"]
