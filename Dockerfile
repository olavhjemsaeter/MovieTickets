# Use OpenJDK 11 with Maven
FROM openjdk:11-jdk-slim

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

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

# Expose port
EXPOSE 10000

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=production
ENV PORT=10000

# Run the application
CMD ["java", "-jar", "target/Oblig3-0.0.1-SNAPSHOT.jar"]
