#FROM maven:3.9.9-eclipse-temurin-21 as builder
#WORKDIR /app
#COPY . /app/.
#RUN mvn -f /app/pom.xml clean package -Dmaven.test.skip=true
#
#FROM eclipse-temurin:21-jre-alpine
#WORKDIR /app
#COPY --from=builder /app/target/*.jar /app/*.jar

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY target/berezovskoye-0.0.1-SNAPSHOT.jar app.jar

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
