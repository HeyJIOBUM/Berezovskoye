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

## ⚙️ Requirements

Make sure you have:

- [Docker](https://docs.docker.com/get-docker/)

---

## 🌐 Access the System

| Service     | URL                       | Description                     |
|-------------|---------------------------|---------------------------------|
| Frontend    | http://localhost          | Public-facing site              |
| Backend API | http://localhost/api      | RESTful API                     |
| Adminer GUI | http://localhost/bd-admin | PostgreSQL management interface |
| Kibana      | http://localhost:5601     | Log analyzer                    |

---

## 🔐 Environment Variables (.env)

Customize variables in the `.env` file in the project root:

```dotenv
ADMINER_PASSWORD=

POSTGRES_DB=
DB_USERNAME=
DB_PASSWORD=

ADMIN_NAME=
ADMIN_PASSWORD=

SECRET_KEY=

EMAIL_FROM=
EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASSWORD=
```

To get EMAIL_PASSWORD for gmail you should generate app passwords.

---

## 🚀 Deployment Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/HeyJIOBUM/Berezovskoye.git
git switch redesigned
```

2. **Start the System**

```bash
docker-compose up --build
```
