# 🏠 Apartment Listing

## Software Engineer Hiring Assignment

This repository contains a full-stack, containerized application for listing and viewing apartment details. The solution is built with a **Node.js/TypeScript** backend, a **Next.js** frontend, and **MongoDB** as the database, all configured for easy setup using Docker Compose.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | **Next.js (React)** |
| **Backend** | **Node.js / Express / TypeScript** |
| **Database** | **MongoDB** |
| **Containerization** | **Docker & Docker Compose** |

---

## 🐳 How to Run the Application

The entire application stack (Frontend, Backend, and Database) is configured to run with a single command using Docker Compose.

### 1. Prerequisites

Ensure you have the latest versions of **Docker** and **Docker Compose** installed on your machine.

### 2. Setup and Execution

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/abdelrahman-codes/Hiring-Assignment.git
    ```

2.  **Start the Stack:**
    Run the following command in the root directory where your \`docker-compose.yml\` is located:

    ```bash
    docker-compose up --build
    ```

| Command Detail | Purpose |
| :--- | :--- |
| \`up\` | Creates and starts the containers. |
| \`--build\` | Forces Docker to rebuild the \`server\` and \`client\` images, ensuring your latest code is deployed into the containers. |

### 3. Accessing the Application

Once the services are running (this may take a minute or two for the initial build):

| Service | Endpoint | Role |
| :--- | :--- | :--- |
| **Frontend (Client)** | 🌐 **http://localhost:3000** | View the Apartment Listing Application |
| **Backend (Server)** | ⚙️ **http://localhost:8080** | Access the API endpoints |
| **Database** | *Internal* | MongoDB instance |
