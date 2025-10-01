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

# Create directories for persistent storage and logs
RUN mkdir -p /app/data /app/logs

# Set proper permissions
RUN chmod 755 /app/data /app/logs

# Expose port
EXPOSE 10000

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=production
ENV PORT=10000
ENV JAVA_OPTS="-Xmx512m -Xms256m -Djava.security.egd=file:/dev/./urandom"

# Add health check with longer timeout for Render
HEALTHCHECK --interval=60s --timeout=30s --start-period=120s --retries=5 \
  CMD curl -f http://localhost:10000/health || exit 1

# Run the application with proper error handling
CMD ["sh", "-c", "echo 'Starting MovieTickets Application...' && java $JAVA_OPTS -jar target/Oblig3-0.0.1-SNAPSHOT.jar"]
