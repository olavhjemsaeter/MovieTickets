# Use OpenJDK 11
FROM openjdk:11-jre-slim

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/Oblig3-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 10000

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=production
ENV PORT=10000

# Run the application
CMD ["java", "-jar", "app.jar"]
