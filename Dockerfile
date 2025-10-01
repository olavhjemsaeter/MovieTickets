# Use OpenJDK 17 with Maven
FROM openjdk:17-jdk-slim

# Install Maven and curl
RUN apt-get update && apt-get install -y maven curl && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Maven files first for dependency caching
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Create data directory for persistent storage
RUN mkdir -p /app/data

# Expose port
EXPOSE 10000

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=production
ENV PORT=10000
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:10000/health || exit 1

# Run the application
CMD ["sh", "-c", "java $JAVA_OPTS -jar target/Oblig3-0.0.1-SNAPSHOT.jar"]
