# Estágio de Build
FROM maven:3.9.6-eclipse-temurin-21-jammy AS build
WORKDIR /app

# 1. Copia o pom.xml e baixa as dependências antes do código
# Isso acelera o build e evita erros de download no meio do processo
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copia o código fonte
COPY src ./src

# 3. Executa o build (Adicionamos o -B para modo batch, mais estável em Docker)
RUN mvn clean package -DskipTests -B

# Estágio de Execução
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]