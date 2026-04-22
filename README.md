# Node.js CI/CD with Docker and GitHub Actions

This is a basic Node.js application with a complete CI/CD pipeline using GitHub Actions for automated deployment to an AWS EC2 instance running Ubuntu.

## Project Description

A simple Express.js server that responds with a JSON message. The application is containerized using Docker and deployed via GitHub Actions to an EC2 instance.

## Features

- Simple REST API endpoint
- Docker containerization
- Automated CI/CD with GitHub Actions
- Deployment to AWS EC2 Ubuntu instance
- Port forwarding for external access

## Prerequisites

Before setting up this project, ensure you have the following:

- **AWS Account**: With an EC2 instance running Ubuntu
- **Docker**: Installed on your EC2 instance
- **GitHub Repository**: To host the code and run Actions
- **SSH Key Pair**: For secure access to your EC2 instance

### EC2 Setup Steps

1. **Create an EC2 Instance**:
   - Launch an Ubuntu-based EC2 instance (e.g., Ubuntu 22.04 LTS)
   - Choose appropriate instance type (t2.micro for testing)

2. **Install Docker on EC2**:
   - Connect to your EC2 instance via SSH
   - Update the system: `sudo apt update`
   - Install Docker: `sudo apt install docker.io`
   - Start Docker service: `sudo systemctl start docker`
   - Enable Docker to start on boot: `sudo systemctl enable docker`

3. **Configure Security Group**:
   - In the AWS EC2 console, go to Security Groups
   - Add an inbound rule for port 8081 (TCP) from anywhere (0.0.0.0/0) or restrict to your IP for security
   - This allows external access to your application

4. **Set up SSH Access**:
   - Generate SSH key pair if not already done
   - Add the public key to your EC2 instance's `~/.ssh/authorized_keys`
   - Store the private key as a GitHub secret (`SSH_KEY`)

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/cicd-nodejs-app.git
   cd cicd-nodejs-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Locally** (optional):
   ```bash
   node index.js
   ```
   The server will run on port 8080.

## Docker Setup

The project includes a Dockerfile for containerization:

- Base image: `node:22-alpine`
- Copies package files and installs dependencies
- Copies source code
- Exposes port 8080
- Runs the application with `node index.js`

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will build the image and run the container, mapping port 8081 on the host to 8080 in the container.

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yaml`) automates deployment:

- **Trigger**: On push to the `main` branch
- **Steps**:
  1. Checkout code
  2. SSH into EC2 instance using stored secrets
  3. Pull latest code on the server
  4. Run `docker-compose up -d --build` to rebuild and restart the application

### Required GitHub Secrets

Set the following secrets in your GitHub repository settings:

- `SSH_HOST`: Public IP or DNS of your EC2 instance
- `SSH_KEY`: Private SSH key for authentication

## Usage

Once deployed, access the application at:

```
http://your-ec2-public-ip:8081/
```

Expected response:
```json
{
  "msg": "Hello From Server ubuntu"
}
```

## Project Structure

- `index.js`: Main Express server file
- `Dockerfile`: Docker image configuration
- `docker-compose.yml`: Docker Compose setup
- `.github/workflows/deploy.yaml`: GitHub Actions CI/CD pipeline
- `package.json`: Node.js dependencies and scripts

## Contributing

Feel free to fork this repository and submit pull requests for improvements.

## License

This project is open-source. Use at your own risk.
