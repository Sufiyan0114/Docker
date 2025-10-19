# Java Minimal Application

A lightweight, containerized Java application built with Maven and Docker for rapid deployment and scalability.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/java-17-orange)](https://www.oracle.com/java/)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://www.docker.com/)
[![Maven](https://img.shields.io/badge/maven-3.x-red)](https://maven.apache.org/)

---

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building the Application](#building-the-application)
- [Docker Deployment](#docker-deployment)
- [Testing the Application](#testing-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## ✨ Features

- **Lightweight Architecture** - Minimal Java application with fast startup
- **Docker Support** - Fully containerized for easy deployment
- **Health Check Endpoint** - Built-in health monitoring
- **Production Ready** - Optimized for production environments
- **RESTful API** - Simple and clean API design

---

## 🔧 Prerequisites

### System Requirements

- **Operating System**: Ubuntu/Kali Linux (Debian-based)
- **Java**: OpenJDK 17 or higher
- **Docker**: Latest stable version
- **Maven**: 3.x or higher

---

## 🚀 Installation

### Step 1: Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Docker and Java

```bash
# Install Docker and OpenJDK 17
sudo apt install docker.io openjdk-17-jdk -y
```

### Step 3: Verify Docker and Java Installation

```bash
# Check Docker version
docker -v

# Check Java version
java -version
```

Expected output:
```
Docker version 24.x.x, build xxxxxx
openjdk version "17.x.x" 2024-xx-xx
```

### Step 4: Start Docker Service

# Add current user to docker group
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker


```bash
# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker

# Check Docker service status
sudo systemctl status docker
```

### Step 5: Docker Login

Docker login is **mandatory** for pulling images from Docker Hub and pushing your custom images.

```bash
# Login to Docker Hub
docker login
```

**You will be prompted for:**
- **Username**: Your Docker Hub username
- **Password**: Your Docker Hub password or access token

Expected output:
```
Login Succeeded
```

> **💡 Pro Tip**: Create a Docker Hub account at [https://hub.docker.com](https://hub.docker.com) if you don't have one.

> **🔐 Security Note**: Use Docker access tokens instead of passwords for better security. Generate tokens from Docker Hub → Account Settings → Security.

### Step 4: Install Maven

```bash
sudo apt install maven -y
```

### Step 5: Verify Maven Installation

```bash
mvn -v
```

Expected output:
```
Apache Maven 3.x.x
Maven home: /usr/share/maven
Java version: 17.x.x, vendor: Private Build
```

---

## 🏗️ Building the Application

### Navigate to Project Directory

```bash
cd ~/DevOps-Automation/Docker/Custom-image/java-app
```

### Build Docker Image

```bash
docker build -t java-app:latest .
```

**Build Parameters:**
- `java-app` → Image name
- `latest` → Image tag
- `.` → Current directory (where Dockerfile is located)

---

## 🐳 Docker Deployment

### Run the Container

```bash
docker run -d -p 80:4567 --name java-container java-app:latest
```

**Run Parameters:**
- `-d` → Run in detached mode
- `-p 80:4567` → Map host port 80 to container port 4567
- `--name java-container` → Container name
- `java-app:latest` → Image to use

### Verify Running Containers

```bash
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE              COMMAND                  CREATED         STATUS         PORTS                    NAMES
xxxxxxxxxx     java-app:latest    "java -jar app.jar"      10 seconds ago  Up 9 seconds   0.0.0.0:80->4567/tcp    java-container
```

---

## 🧪 Testing the Application

### Test Main Endpoint

```bash
curl http://localhost
```

**Expected Response:**
```
Hello from Java Minimal App!
```

### Test Health Check Endpoint

```bash
curl http://localhost/health
```

**Expected Response:**
```json
{"status":"UP"}
```

### Test from Browser

Open your browser and navigate to:
- Main App: `http://localhost`
- Health Check: `http://localhost/health`

---

## 🛠️ Docker Management Commands

### Stop the Container

```bash
docker stop java-container
```

### Remove the Container

```bash
docker rm java-container
```

### Remove the Image

```bash
docker rmi java-app:latest
```

### View Container Logs

```bash
docker logs java-container
```

### View Container Resource Usage

```bash
docker stats java-container
```

### Execute Commands Inside Container

```bash
docker exec -it java-container /bin/bash
```

---

## 📁 Project Structure

```
java-app/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── example/
│                   └── App.java        # Main application file
├── .gitkeep                            # Git directory placeholder
├── Dockerfile                          # Docker configuration
└── pom.xml                             # Maven configuration
```

### File Descriptions

| File | Description |
|------|-------------|
| `App.java` | Main Java application with REST endpoints |
| `Dockerfile` | Container build instructions |
| `pom.xml` | Maven project dependencies and build configuration |
| `.gitkeep` | Ensures empty directories are tracked by Git |

---

## 🌐 API Endpoints

### Base URL
```
http://localhost
```

### Available Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/` | GET | Main application endpoint | `Hello from Java Minimal App!` |
| `/health` | GET | Health check endpoint | `{"status":"UP"}` |

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the Branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow Java coding conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📊 Performance & Optimization

### Container Size

The Docker image is optimized for minimal size:
- Base image: OpenJDK Alpine
- Final image size: ~150MB

### Startup Time

- Average startup time: < 5 seconds
- First request response: < 100ms

---

## 🔐 Security Considerations

- Container runs with non-root user
- Minimal attack surface with Alpine Linux
- No sensitive data in image layers
- Health endpoint for monitoring

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sufiyan**
- LinkedIn: [Connect with me](https://www.linkedin.com/in/shaikh-sufiyan01/)
- GitHub: [@Shaikh Sufiyan](https://github.com/Sufiyan0114)

---

<div align="center">
  
**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Sufiyan

</div>