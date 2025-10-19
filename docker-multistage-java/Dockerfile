FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .

# Download deps first 
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: prod image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

# Copy java binary file
COPY --from=build --chown=appuser:appgroup /app/target/*-jar-with-dependencies.jar app.jar

USER appuser

EXPOSE 4567


HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -q -O /dev/null http://localhost:4567/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
