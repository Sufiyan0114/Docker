# React Application

A lightweight, production-ready React application with Docker support and comprehensive deployment options.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.x-61dafb)](https://reactjs.org/)

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🔧 Prerequisites

### Node.js & NPM Installation

#### Linux

**Debian/Ubuntu (Kali Linux)**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Fedora**
```bash
sudo dnf install -y nodejs npm
```

**CentOS/RHEL 8+**
```bash
sudo dnf module install -y nodejs:18
```

#### Windows 10/11

1. Visit [Node.js Official Website](https://nodejs.org/en/download)
2. Download the Windows installer
3. Run the installer and follow the setup wizard

### Verify Installation

```bash
node -v
npm -v
```

> **Note for Windows Users:** If you encounter execution policy errors, run the following command in PowerShell before using npm:
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

---

## 🚀 Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <your-repository-url>
cd react-app

# Install dependencies
npm install
```

---

## 💻 Running Locally

### Development Server

```bash
npm start
```

The application will be available at **http://localhost:3000**

### Production Build

```bash
npm run build
```

---

## 🐳 Docker Deployment

### Prerequisites for Docker

- Docker installed on your system
- WSL2 (for Windows users)
- Docker Hub account for pulling/pushing images

### Docker Installation & Setup

**For Linux (Ubuntu/Debian):**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install docker.io -y

# Add docker in sudo group
sudo usermod -aG docker $USER

# Refresh current shell immediately without logout/login  
newgrp docker             

# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker

# Verify Docker installation
docker -v
```

**Docker Login (Mandatory)**

Docker login is **required** for pulling images from Docker Hub and pushing your custom images.

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

> **💡 Important**: Without Docker login, you cannot pull base images or push your custom images to Docker Hub.

> **🔐 Security Tip**: Use Docker access tokens instead of passwords. Generate tokens from [Docker Hub](https://hub.docker.com) → Account Settings → Security.

**Add User to Docker Group (Optional - to run Docker without sudo):**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Step-by-Step Docker Deployment

**1. Install Dependencies**
```bash
npm install
```

**2. Build the Application**
```bash
npm run build
```

**3. Build Docker Image**
```bash
docker build -t react-app:latest .
```

**4. Run Docker Container**
```bash
docker run -d -p 8080:8080 --name react-app react-app:latest
```

**5. Verify Deployment**
```bash
curl http://localhost:8080
```

Expected output:
```html
<!doctype html><html lang="en"><head><meta charset="UTF-8"/><title>Lightweight React App</title><script defer="defer" src="/static/js/main.d2075b9f.js"></script></head><body><div id="root"></div></body></html>
```

### Docker Management Commands

```bash
# Stop the container
docker stop react-app

# Remove the container
docker rm react-app

# Remove the image
docker rmi react-app:latest

# View running containers
docker ps

# View all containers
docker ps -a
```

---

## 📁 Project Structure

```
react-app/
├── build/                  # Production build files
├── node_modules/           # NPM dependencies
├── public/                 # Static files
│   └── index.html         # HTML template
├── src/                    # Source files
│   ├── App.js             # Main App component
│   └── index.js           # Entry point
├── .dockerignore          # Docker ignore file
├── .gitignore             # Git ignore file
├── Dockerfile             # Docker configuration
├── nginx.conf             # Nginx configuration
├── package-lock.json      # NPM lock file
├── package.json           # Project dependencies
└── README.md              # Project documentation

---
## 📄 License

This project is licensed under the MIT License

---
## 👨‍💻 Author

**Sufiyan**

- LinkedIn: [Connect with me](https://www.linkedin.com/in/shaikh-sufiyan01/)
- GitHub: [@Shaikh Sufiyan](https://github.com/Sufiyan0114)

---

<div align="center">
  Made with ❤️ by Sufiyan
</div>
