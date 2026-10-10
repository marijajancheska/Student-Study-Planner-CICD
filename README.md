# Student Study Planner

A full-stack web application for organizing study tasks, subjects, and deadlines. The project also demonstrates containerization, multi-service orchestration, an automated Docker image publishing pipeline, and a local Kubernetes deployment.

## Features

- Create study tasks with a title, subject, and optional deadline.
- View saved tasks and their current status.
- Mark pending tasks as completed.
- Persist task data in PostgreSQL.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Axios, CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL 16 |
| Containers | Docker, Docker Compose, Nginx |
| CI | GitHub Actions, DockerHub |
| Orchestration | Kubernetes, NGINX Ingress Controller |

## Architecture

```text
Browser (React frontend)
       |
       | HTTP requests
       v
Node.js / Express REST API
       |
       | SQL queries
       v
PostgreSQL database
```

Docker Compose runs the frontend, backend, and database as three services. The frontend is built with Vite and served by Nginx. PostgreSQL data is stored in a named Docker volume.

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | Check whether the backend is running |
| GET | `/api/tasks` | Retrieve saved tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id/complete` | Mark a task as completed |

A task contains a title, subject, optional deadline, and completion status.

## Run Locally with Docker Compose

**Requirements:** Docker Desktop with Docker Compose.

From the repository root, run:

```bash
docker compose up -d --build
```

When the containers are running, use:

- Frontend: http://localhost:3000
- Backend health check: http://localhost:5000/health

Check the running services:

```bash
docker compose ps
```

Stop the Compose services:

```bash
docker compose down
```

The database uses the `postgres_data` named volume so data can persist across container restarts. The provided Compose configuration uses development-only database credentials; change them before using the application outside a local development environment.

## Continuous Integration with GitHub Actions

The workflow in `.github/workflows/ci.yml` runs when changes are pushed to the `main` branch. It:

1. Checks out the source code.
2. Authenticates to DockerHub using GitHub Actions secrets.
3. Builds and publishes the backend Docker image.
4. Builds and publishes the frontend Docker image.

Published images:

- [Backend image](https://hub.docker.com/r/marijaaaj/study-planner-backend)
- [Frontend image](https://hub.docker.com/r/marijaaaj/study-planner-frontend)

[View GitHub Actions runs](https://github.com/marijajancheska/Student-Study-Planner-CICD/actions)

**Scope:** The pipeline automates image builds and publishing. Kubernetes deployment is configured separately and is not automatically updated by this workflow.

## Kubernetes Deployment

The `k8s/` directory contains manifests for the `study-planner` namespace, including:

- Frontend and backend Deployments and Services.
- PostgreSQL StatefulSet with persistent volume storage and a database Service.
- ConfigMap and Secret resources for application configuration.
- An Ingress resource with the host `study-planner.local`.

The manifests were used with a local Docker Desktop Kubernetes cluster. The application images in the supplied manifests are configured for local use (`imagePullPolicy: Never`); they must be available on the Kubernetes node. Applying them to a different cluster may require changing the image references and pull policy.

With Kubernetes enabled and the necessary images and NGINX Ingress Controller available, apply the resources:

```bash
kubectl apply -f k8s/
```

Check their status:

```bash
kubectl get pods -n study-planner
kubectl get deployments -n study-planner
kubectl get statefulsets -n study-planner
kubectl get svc -n study-planner
kubectl get ingress -n study-planner
```

For convenient local access to the frontend:

```bash
kubectl port-forward -n study-planner svc/frontend-service 8080:80
```

Then open http://localhost:8080.

**Local routing note:** The current React application sends API requests to `http://localhost:5000`, so that address must be reachable from the browser for task operations to work. The current Ingress routes `/` to the frontend; it does not independently proxy `/api` to the backend. Port-forwarding the frontend alone does not make the backend accessible from a different computer.

## Project Status and Scope

The application was tested locally with Docker Compose and a Docker Desktop Kubernetes cluster. The frontend, backend, and PostgreSQL services were running, task data persisted after a browser refresh, the NGINX Ingress returned an HTTP 200 response for the frontend, and a new push to `main` successfully triggered GitHub Actions to publish Docker images to DockerHub.

This is a learning and portfolio project focused on Docker, CI, and Kubernetes rather than a production-hosted service. Future improvements could include configurable API routing, stronger input validation, automated tests, and safer management of development credentials.
