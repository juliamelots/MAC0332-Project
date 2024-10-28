# MAC0332 - Vite + React + Typescript developer guide

## Dependencies
- [Docker](https://docs.docker.com/)

### Internal dependencies
These dependencies are handled by Docker when running the servers and currently are only required for linting the front-end application.
- [Node.js](https://nodejs.org/en)
- [Vite](https://vite.dev/)
- [Nginx](https://nginx.org/en/)

## Development server
From the front-end folder, run `docker-compose up frontend-dev` to build and run the project in development. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Production server
From the front-end folder, run `docker-compose up frontend-prod` to build and run the project in production. Navigate to `http://localhost:80/`.

## Shutting down the containers
Run `docker-compose down` to stop and remove the containers.

## Linting
First, run `npm install` to install this Vite project's internal dependencies. Then, run `npm run lint` to check for code and formatting errors.
