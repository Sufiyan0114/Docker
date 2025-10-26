# 🚀 Light Node App

A lightweight, production-ready Node.js application built with Express.js and containerized with Docker. Features best practices for security, health checks, and deployment.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Local Development](#local-development)
  - [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Health Check](#health-check)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Lightweight**: Minimal Express.js application with essential features
- **Production-Ready**: Multi-stage Docker builds with security best practices
- **Security-First**: Non-root user, file permissions, and security hardening
- **Health Monitoring**: Built-in health check endpoint for container orchestration
- **Alpine Linux**: Ultra-lightweight base image for minimal footprint
- **Optimized**: Production dependencies only, efficient layer caching

## 📦 Prerequisites

- **Node.js** 18.x or higher
- **Docker** (for containerized deployment)
- **npm** or **yarn** package manager

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Docker-Node-js.git
   cd Docker-Node-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   ```
   http://localhost:3000
   ```

### Docker Deployment

#### Build the Docker Image

```bash
docker build -t light-node-app .
```

#### Run the Container

```bash
docker run -d -p 3000:3000 --name my-app light-node-app
```

#### Using Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/healthz"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 10s
```

Then run:

```bash
docker-compose up -d
```

## 📁 Project Structure

```
Docker-Node-js/
├── Dockerfile              # Multi-stage Docker build configuration
├── index.js               # Main application entry point
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── eslint.config.js       # ESLint configuration
└── README.md             # Project documentation
```

## 🔌 API Endpoints

### GET /
Root endpoint that returns a welcome message.

**Response:**
```
🚀 Lightweight Node App Running!
```

### GET /healthz
Health check endpoint for container orchestration (Docker, Kubernetes, etc.).

**Response:**
```
OK
```

## 🔒 Security Features

This project implements several security best practices:

- **Non-Root User**: Runs as `appuser` (UID 1001) instead of root
- **File Permissions**: Restricted file and directory permissions (640/750)
- **Minimal Surface Area**: Removed SUID/SGID binaries
- **Multi-Stage Build**: Separate build and runtime stages
- **Production Dependencies**: Only production packages in final image
- **Health Checks**: Built-in container health monitoring
- **Alpine Linux**: Minimal attack surface with Alpine base image

## 💚 Health Check

The application includes a health check endpoint configured in the Dockerfile:

```bash
# Check container health
docker ps

# Manual health check
curl http://localhost:3000/healthz
```

## 🌍 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port on which the server will listen |

### Setting Environment Variables

**Docker:**
```bash
docker run -d -p 3000:3000 -e PORT=8080 --name my-app light-node-app
```

**Docker Compose:**
```yaml
environment:
  - PORT=8080
```

## 🛠️ Development

### Available Scripts

```bash
# Start the application
npm start

# Run tests
npm test
```

### Linting

The project uses ESLint for code quality. Configuration is in `eslint.config.js`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Sufiyan** - *Initial work*

## Acknowledgments

- Express.js team for the amazing framework
- Node.js community for continuous improvements
- Docker for containerization technology

---

**Made with ❤️ using Node.js and Docker**

