# Python Docker Application

A lightweight, containerized Python application built with Docker for seamless deployment across multiple platforms.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.9+-blue)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://www.docker.com/)
[![Platform](https://img.shields.io/badge/platform-linux%20%7C%20wsl2-lightgrey)](https://docs.microsoft.com/en-us/windows/wsl/)

---

## 📋 Table of Contents

- [Features](#features)
- [Supported Platforms](#supported-platforms)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Building the Application](#building-the-application)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Docker Management](#docker-management)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## ✨ Features

- **Cross-Platform Support** - Works on Ubuntu, Kali Linux, and WSL2 (Windows)
- **Docker Containerized** - Fully containerized for consistent deployments
- **Lightweight** - Minimal dependencies for fast startup
- **Production Ready** - Optimized for production environments
- **Easy Deployment** - Simple build and run commands

---

## 💻 Supported Platforms

This application supports the following platforms:

| Platform | Support | Notes |
|----------|---------|-------|
| Ubuntu 20.04+ | ✅ Full | Native support |
| Kali Linux | ✅ Full | Native support |
| WSL2 (Windows) | ✅ Full | Requires WSL2 setup |
| Debian-based Linux | ✅ Full | Native support |

---

## 🔧 Prerequisites

### System Requirements

- **Operating System**: Ubuntu, Kali Linux, or WSL2 on Windows 10/11
- **Docker**: Latest stable version
- **Internet Connection**: For pulling Docker base images
- **Docker Hub Account**: Required for image operations

### For Windows Users - WSL2 Setup

Install WSL2 before proceeding:

1. Open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```
2. Restart your computer
3. Set up your Linux distribution (Ubuntu recommended)
4. Open WSL2 terminal and follow the Linux installation steps below

---

## 🚀 Installation

### Step 1: Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Docker

```bash
# Install Docker
sudo apt install docker.io -y

# Verify Docker installation
docker --version
```

Expected output:
```
Docker version 24.x.x, build xxxxxx
```

### Step 3: Start and Enable Docker Service

```bash
# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker

# Verify Docker service is running
sudo systemctl status docker
```

Expected output:
```
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled)
     Active: active (running)
```

### Step 4: Add User to Docker Group (Optional)

This allows running Docker commands without `sudo`:

```bash
# Add current user to docker group
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker

# Verify - this should work without sudo
docker ps
```

---

## 🔐 Docker Setup

### Create Docker Hub Account

If you don't have a Docker Hub account:

1. Visit [Docker Hub](https://hub.docker.com)
2. Click "Sign Up"
3. Complete the registration process
4. Verify your email address

### Docker Login (Mandatory)

Docker login is **required** for pulling base images and managing your containers.

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

Logging in with your password grants your terminal complete access to your account.
For better security, log in with a limited-privilege personal access token.
```

> **🔐 Security Best Practice**: Use Docker access tokens instead of passwords.
> 
> **Generate Access Token:**
> 1. Go to [Docker Hub](https://hub.docker.com) → Account Settings → Security
> 2. Click "New Access Token"
> 3. Give it a name and set permissions
> 4. Copy the token and use it as your password when logging in

---

## 🏗️ Building the Application

### Navigate to Project Directory

```bash
cd python-app
```

### Build Docker Image

```bash
docker build -t python-app:latest .
```

**Build Parameters:**
- `-t python-app:latest` → Tag the image with name and version
- `.` → Use Dockerfile in current directory

Expected output:
```
[+] Building 45.2s (10/10) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 234B
 => [internal] load .dockerignore
 => CACHED [1/5] FROM docker.io/library/python:3.9-slim
 => [2/5] WORKDIR /app
 => [3/5] COPY requirements.txt .
 => [4/5] RUN pip install --no-cache-dir -r requirements.txt
 => [5/5] COPY . .
 => exporting to image
 => => exporting layers
 => => writing image sha256:abc123...
 => => naming to docker.io/library/python-app:latest
```

### Verify Image Creation

```bash
docker images | grep python-app
```

Expected output:
```
python-app    latest    abc123def456    2 minutes ago    150MB
```

---

## 🚀 Running the Application

### Start the Container

```bash
docker run -d -p 8080:8080 --name python-app python-app:latest
```

**Run Parameters:**
- `-d` → Run in detached mode (background)
- `-p 8080:8080` → Map host port 8080 to container port 8080
- `--name python-app` → Assign a name to the container
- `python-app:latest` → Image to use

### Verify Container is Running

```bash
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE               COMMAND           CREATED         STATUS         PORTS                    NAMES
abc123def456   python-app:latest   "python app.py"   10 seconds ago  Up 9 seconds   0.0.0.0:8080->8080/tcp  python-app
```

---

## 🧪 Testing the Application

### Test from Terminal

```bash
curl http://localhost:8080
```

**Expected Response:**
```
Hello from Python Docker App!
```

### Test from Browser

Open your browser and navigate to:
```
http://localhost:8080
```

### Additional Testing

```bash
# Check container logs
docker logs python-app

# Follow logs in real-time
docker logs -f python-app

# Check container resource usage
docker stats python-app
```

---

## 🛠️ Docker Management

### Stop the Container

```bash
docker stop python-app
```

### Start a Stopped Container

```bash
docker start python-app
```

### Restart the Container

```bash
docker restart python-app
```

### Remove the Container

```bash
# Stop the container first
docker stop python-app

# Remove the container
docker rm python-app
```

### Remove the Image

```bash
docker rmi python-app:latest
```

### View Container Logs

```bash
# View all logs
docker logs python-app

# View last 100 lines
docker logs --tail 100 python-app

# Follow logs in real-time
docker logs -f python-app
```

### Execute Commands Inside Container

```bash
# Open bash shell inside container
docker exec -it python-app /bin/bash

# Run a single command
docker exec python-app ls -la
```

### Clean Up All Stopped Containers

```bash
# Remove all stopped containers
docker container prune -f

# Remove all unused images
docker image prune -a -f

# Remove everything (containers, images, volumes, networks)
docker system prune -a --volumes -f
```

---

## 📁 Project Structure

```
python-app/
├── app.py              # Main Python application file
├── Dockerfile          # Docker container configuration
├── requirements.txt    # Python dependencies
└── README.md          # Project documentation (this file)
```

### File Descriptions

| File | Description | Purpose |
|------|-------------|---------|
| `app.py` | Main application | Contains the Python web server and application logic |
| `Dockerfile` | Docker configuration | Defines how to build the Docker image |
| `requirements.txt` | Python dependencies | Lists all required Python packages |
| `README.md` | Documentation | Project setup and usage instructions |


## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Docker daemon not running

**Error:**
```
Cannot connect to the Docker daemon. Is the docker daemon running?
```

**Solution:**
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

#### Issue 2: Permission denied

**Error:**
```
Got permission denied while trying to connect to the Docker daemon socket
```

**Solution:**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

#### Issue 3: Port already in use

**Error:**
```
Bind for 0.0.0.0:8080 failed: port is already allocated
```

**Solution:**
```bash
# Find process using port 8080
sudo lsof -i :8080

# Kill the process or use a different port
docker run -d -p 8081:8080 --name python-app python-app:latest
```

#### Issue 4: Image build fails

**Error:**
```
failed to solve with frontend dockerfile.v0
```

**Solution:**
```bash
# Clear Docker cache and rebuild
docker builder prune -f
docker build --no-cache -t python-app:latest .
```

#### Issue 5: Container exits immediately

**Solution:**
```bash
# Check container logs for errors
docker logs python-app

# Run container in interactive mode to debug
docker run -it python-app:latest /bin/bash
```

---

## 📊 Performance Tips

### Optimize Docker Image Size

1. Use Alpine-based images for smaller size
2. Combine RUN commands to reduce layers
3. Use `.dockerignore` file to exclude unnecessary files
4. Use multi-stage builds for production

### Example .dockerignore:
```
__pycache__/
*.pyc
*.pyo
*.pyd
.git/
.gitignore
README.md
.env
venv/
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/python-app.git
   cd python-app
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow PEP 8 style guide for Python
   - Add comments where necessary

4. **Test Your Changes**
   ```bash
   docker build -t python-app:test .
   docker run -d -p 8080:8080 --name test-app python-app:test
   curl http://localhost:8080
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```

6. **Push to GitHub**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**

### Contribution Guidelines

- ✅ Write clear commit messages
- ✅ Follow Python best practices
- ✅ Update documentation as needed
- ✅ Add tests for new features
- ✅ Ensure Docker image builds successfully

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Sufiyan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Author

**Sufiyan**

- LinkedIn: [Connect with me](https://www.linkedin.com/in/shaikh-sufiyan01/)
- GitHub: [@Shaikh Sufiyan](https://github.com/Sufiyan0114)
- Portfolio: [your-website.com](https://your-website.com)
- Email: your-email@example.com

---

##  Acknowledgments

- Python Community for excellent documentation
- Docker team for containerization technology
- Flask framework for lightweight web applications
- Open-source contributors worldwide

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Python Documentation](https://docs.python.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [WSL2 Documentation](https://docs.microsoft.com/en-us/windows/wsl/)

---

## 📞 Support

Need help? Here's how to get support:

- 💬 **Questions**: Contact via LinkedIn or email
- 📖 **Documentation**: Check this README first

---

<div align="center">

**⭐ If you find this project helpful, please give it a star!**

**Made with ❤️ and 🐍 by Sufiyan**

[⬆ Back to Top](#python-docker-application)

</div>
