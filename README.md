
# 📦 Berezovskoye Redesigned — Full Deployment & Usage Guide

This project is a redesigned version of the Berezovskoye system. It includes a fully containerized environment with:

- Spring Boot backend
- Next.js frontend
- PostgreSQL database
- Adminer database GUI
- ELK stack (Elasticsearch, Logstash, Kibana)
- NGINX reverse proxy

It is built for easy deployment using Docker Compose.

---

## 📁 Project Structure

```
.
├── docker-compose.yml                 # Orchestration file
├── .env                               # Environment variables
├── adminerneo/                        # Adminer GUI (custom)
├── berezovskoye-backend/              # Spring Boot backend (Java + Maven)
├── berezovskoye-frontend              # Frontend (React + Next.js)
├── logstash/, elasticsearch/, kibana/ # ELK stack
├── nginx/                             # NGINX configuration
```

---

## ⚙️ Requirements

Make sure you have:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Open ports: **80**, **443**, **8080**, **8081**, **5432**, **9200**, **5601**

---

## 🌐 Service Access URLs

| Service        | URL                       | Description                     |
|----------------|----------------------------|---------------------------------|
| Frontend       | http://localhost           | Public-facing site              |
| Backend API    | http://localhost:8080      | RESTful API                     |
| Adminer GUI    | http://localhost:8081      | PostgreSQL management interface |
| Kibana         | http://localhost:5601      | Logs and analytics dashboard    |
| Elasticsearch  | http://localhost:9200      | Search engine (for dev use)     |

---

## 🔐 Environment Variables (.env)

Create a `.env` file in the project root with the following content:

```dotenv
POSTGRES_DB=berezovskoye
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123

SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/berezovskoye
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=admin123

NEXT_PUBLIC_API_URL=http://localhost:8080
```

These are loaded automatically into the containers by Docker Compose.

---

## 🚀 Deployment Instructions

1. **Clone the Repository**

```bash
git clone https://your-repo-url.git
cd Berezovskoye-redesigned
```

2. **Ensure the `.env` file is created (as above)**

3. **Start the System**

```bash
docker-compose up --build
```

4. **Access the System**

- Frontend: [http://localhost](http://localhost)
- Adminer: [http://localhost:8081](http://localhost:8081)
- Kibana: [http://localhost:5601](http://localhost:5601)

---

## 🧪 Useful Docker Commands

- **Stop and remove all containers:**
```bash
docker-compose down
```

- **Rebuild everything cleanly:**
```bash
docker-compose up --build --force-recreate
```

- **Live logs:**
```bash
docker-compose logs -f
```

---

## 🛠 Notes and Recommendations

- **Frontend** (`nextjs/`) is automatically served via **NGINX reverse proxy** on port 80.
- **Backend** (`spring/`) is exposed on port **8080**.
- **Adminer** runs on **8081** for easy database management.
- **ELK Stack** is used for logs:
  - Logstash → Elasticsearch → Kibana
- **Make sure Docker is allowed at least 2GB RAM**, especially for Elasticsearch.
- If you want to expose services to the public internet, configure HTTPS certificates in the `nginx/` folder.

---

## 🧾 Final Notes

This system is fully containerized and portable. It is designed for local development, staging, or production with minor changes. With Docker Compose, the entire environment can be spun up with one command.

If you have any issues, consult Docker logs or reach out to the developers.
