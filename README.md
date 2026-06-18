# Student Study Planner CI/CD

This project is a full-stack Student Study Planner web application created for demonstrating Dockerization, local orchestration with Docker Compose, Kubernetes deployment configuration and CI with GitHub Actions.

## Application Structure

The application consists of three main parts:

* **Frontend** - user interface of the application
* **Backend** - Node.js/Express API server
* **Database** - PostgreSQL database

## Technologies Used

* Git and GitHub
* Docker
* Docker Compose
* Node.js / Express
* PostgreSQL
* GitHub Actions
* Kubernetes
* Ingress

## Docker and Docker Compose

The application is dockerized using separate containers for the frontend, backend and database.

Docker Compose is used to start all services locally.

To build and start the application, run:

```sh
docker compose up --build
```

To check the running containers, run:

```sh
docker compose ps
```

Expected services:

* frontend
* backend
* database

The frontend is available locally through the configured frontend port, while the backend can be checked through its health endpoint:

```text
/health
```

The health endpoint returns a simple response confirming that the backend service is running.

## GitHub Actions CI Pipeline

The project includes a GitHub Actions workflow used for continuous integration.

The workflow is triggered on push to the repository and performs the build process for the Docker images. Successful workflow runs in the GitHub Actions tab confirm that the CI pipeline is working correctly.

## Kubernetes

The project contains Kubernetes manifests for deploying the application in a Kubernetes environment.

The Kubernetes configuration includes resources for:

* namespace
* configuration values
* secrets
* database storage
* frontend deployment and service
* backend deployment and service
* database deployment/stateful configuration and service
* ingress configuration

To apply the Kubernetes manifests, run:

```sh
kubectl apply -f k8s/
```

To check the deployed resources, run:

```sh
kubectl get pods -n study-planner
kubectl get svc -n study-planner
kubectl get ingress -n study-planner
```

## Ingress

The project includes an Ingress resource for exposing the frontend application through an HTTP route.

The Ingress resource defines routing rules that forward external HTTP requests to the frontend service inside the Kubernetes cluster.

In the local Kubernetes environment, the application is accessed through the configured Ingress controller address and port.

## Project Verification

The project was verified by checking that:

* Docker Compose starts all required services successfully
* frontend, backend and database containers are running
* backend health endpoint returns a successful response
* Docker images are built successfully
* Kubernetes manifests are applied successfully
* Kubernetes pods and services are running
* Ingress resource is created and routes traffic to the frontend service
* GitHub Actions workflow runs successfully after pushing changes to GitHub

## Summary

This project demonstrates a basic CI workflow for a full-stack web application. The application is containerized with Docker, orchestrated locally with Docker Compose, prepared for Kubernetes deployment using manifests and automatically built through GitHub Actions.
