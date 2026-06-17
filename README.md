# Student Study Planner CI/CD

This project is a full-stack Student Study Planner web application created for demonstrating Dockerization, Docker Compose orchestration, Kubernetes deployment configuration and a CI pipeline with GitHub Actions.

The purpose of the project is to show how a web application can be containerized, started locally with Docker Compose, prepared for deployment in Kubernetes and automatically built through a CI pipeline.

## Application Structure

The application consists of three main services:

* **Frontend** - user interface for the Student Study Planner application
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

## Docker

The application is dockerized using separate Dockerfiles for the frontend and backend services.

Docker is used to package the application services into containers, so the application can run in the same way on different environments.

## Docker Compose

Docker Compose is used for local orchestration of the application.

It starts the frontend, backend and PostgreSQL database together as separate containers.

### Start the application

Run the following command from the root directory of the project:

```sh
docker compose up --build
```

This command builds and starts all services:

* frontend
* backend
* database

### Check running containers

```sh
docker compose ps
```

Expected containers:

```text
study-planner-frontend
study-planner-backend
study-planner-db
```

The expected result is that all containers have the status `Up`.

### Application URLs

Frontend:

```text
http://localhost:3000
```

Backend health check:

```text
http://localhost:5000/health
```

Database:

```text
localhost:5432
```

The backend health check endpoint returns:

```json
{
  "status": "Backend is running"
}
```

This confirms that the backend service is running successfully.

## Docker Images

The Docker images are built for the frontend and backend services.

To check the created images, run:

```sh
docker images
```

Expected images:

```text
student-study-planner-cicd-frontend
student-study-planner-cicd-backend
postgres:16
```

## GitHub Actions CI Pipeline

The project uses GitHub Actions for the CI pipeline.

The workflow is triggered automatically on every push to the main branch.

The CI pipeline performs the Docker image build process and verifies that the application can be built successfully.

Successful workflow runs in the GitHub Actions tab confirm that the CI pipeline works correctly.

## Kubernetes

The project contains Kubernetes manifests for running the application in a Kubernetes environment.

Kubernetes is used to define how the frontend, backend and database services would be deployed inside a cluster.

The Kubernetes configuration includes:

* Namespace
* ConfigMaps
* Secrets
* PersistentVolumeClaim for the database
* PostgreSQL database configuration
* Backend deployment and service
* Frontend deployment and service
* Ingress configuration

### Apply Kubernetes manifests

Run the following command from the root directory of the project:

```sh
kubectl apply -f k8s/
```

### Check Kubernetes resources

Check pods:

```sh
kubectl get pods -n study-planner
```

Check services:

```sh
kubectl get svc -n study-planner
```

Check ingress:

```sh
kubectl get ingress -n study-planner
```

## Ingress

The project includes an Ingress manifest.

Ingress is used to expose the frontend service outside the Kubernetes cluster and make the application accessible through a browser.

Before testing Ingress, an Ingress controller must be installed and running in the cluster.

The frontend service is exposed through Ingress, while the backend and database services are used internally by the application.

## Project Verification

The project was tested with the following checks:

1. Docker Compose successfully starts all services.
2. The frontend container runs on port 3000.
3. The backend container runs on port 5000.
4. The PostgreSQL database container runs on port 5432.
5. The backend `/health` endpoint returns a successful response.
6. Docker images for frontend and backend are created successfully.
7. GitHub Actions workflow runs successfully after push to GitHub.
8. Kubernetes manifests are prepared for frontend, backend, database and Ingress configuration.

These checks confirm that the Docker, Docker Compose, Kubernetes configuration and CI pipeline parts of the project are working properly.

## Summary

This project demonstrates a basic CI/CD workflow for a full-stack web application.

The application is containerized with Docker, orchestrated locally with Docker Compose, prepared for Kubernetes deployment using manifests and automatically built through GitHub Actions.
