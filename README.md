# TaskFlow AI — Enterprise Smart Team Task Management Platform

## Project Overview
TaskFlow AI is a robust, production-ready enterprise SaaS platform for team task management. The backend is built using a modern Java 21 and Spring Boot 3.x stack, following Domain Driven Design (DDD), Clean Architecture, and SOLID principles. It is designed to handle high concurrency and strict multi-tenant data isolation.

## Tech Stack
- **Java 21**
- **Spring Boot 3.x**
- **Spring Security 6 & JWT**
- **Spring Data JPA & Hibernate**
- **PostgreSQL 15**
- **Flyway Database Migrations**
- **MapStruct & Lombok**
- **OpenAPI 3 (Swagger UI)**
- **Docker & Docker Compose**

## Folder Structure (Monorepo)
```text
TaskFlow-AI/
├── frontend/                # React Vite Frontend (UI)
├── backend/                 # Spring Boot Backend API
│   ├── src/main/java        # Java Source Code
│   │   └── com/taskflow     # Root Package
│   ├── src/main/resources   # Configuration & Migrations
│   ├── pom.xml              # Maven Build Configuration
│   └── Dockerfile           # Backend Containerization
├── docs/                    # Architecture & Planning Documents
└── docker-compose.yml       # Local Development Infrastructure
```

## Prerequisites
- **Java 21 JDK**
- **Maven 3.9+** (or use the provided `./mvnw` wrapper)
- **Docker & Docker Compose**

## Environment Variables
The application relies on the following environment variables (defined in `docker-compose.yml` or your local `.env`):
- `SPRING_PROFILES_ACTIVE`: `dev`, `prod`, or `test`
- `DB_URL`: JDBC PostgreSQL connection string
- `DB_USER`: Database username
- `DB_PASS`: Database password
- `JWT_SECRET`: Base64 encoded secure secret key

## How to Run locally

### 1. Using Docker Compose (Recommended)
This will spin up both the PostgreSQL database and the Spring Boot backend container.
```bash
docker-compose up -d --build
```

### 2. Using Maven (Local DB required)
If you have a local PostgreSQL instance running:
```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## Build Commands
To compile the project and download all dependencies:
```bash
cd backend
./mvnw clean compile
```

To package the application into a JAR:
```bash
./mvnw clean package -DskipTests
```

## Testing Commands
Run unit and integration tests (uses Testcontainers for database tests):
```bash
cd backend
./mvnw clean test
```

## URLs
- **API Base URL:** `http://localhost:8080/api/v1`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **Actuator Health:** `http://localhost:8080/actuator/health`
- **Actuator Metrics:** `http://localhost:8080/actuator/metrics`
