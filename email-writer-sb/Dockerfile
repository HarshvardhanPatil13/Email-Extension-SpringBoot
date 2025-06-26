# Build stage
FROM maven:3.8.8-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy only pom.xml first (to cache dependencies)
COPY pom.xml .
RUN mvn dependency:go-offline

# Then copy the source code
COPY src /app/src

# Package the app (skip tests)
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:21-slim
WORKDIR /app

# Copy built jar
COPY --from=build /app/target/email-writer-sb-0.0.1-SNAPSHOT.jar email-writer.jar

# Expose port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "email-writer.jar"]
