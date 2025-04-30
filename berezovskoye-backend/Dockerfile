FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /build
COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY target/*.jar app.jar

ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=mydb
ENV DB_USERNAME=user
ENV DB_PASSWORD=pass
ENV FRONT_URL=http://frontend
ENV IMAGES_URL=http://localhost:8080/image/
ENV XLS_URL=http://localhost:8080/xls/
ENV ADMIN_NAME=admin
ENV ADMIN_PASSWORD=adminpass

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/*.jar"]
