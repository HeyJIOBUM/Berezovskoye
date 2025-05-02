# Стадия сборки (builder)
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Финальная стадия
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Копируем .jar из стадии builder, а не из локального target/
COPY --from=builder /build/target/berezovskoye-*.jar app.jar

# Остальные настройки
#ENV DB_HOST=postgres
#ENV DB_PORT=5432
#ENV DB_NAME=berezovskoye_database
#ENV DB_USERNAME=user
#ENV DB_PASSWORD=password
#ENV FRONT_URL=http://frontend
#ENV IMAGES_URL=http://localhost:8080/image/
#ENV XLS_URL=http://localhost:8080/xls/
#ENV ADMIN_NAME=admin
#ENV ADMIN_PASSWORD=adminpass
#ENV SECRET_KEY=secretKey

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
