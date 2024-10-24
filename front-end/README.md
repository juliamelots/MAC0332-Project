# MAC0332 - Vite + React + Typescript developer guide

## Dependencies
- [Node.js](https://nodejs.org/en)
- [Vite](https://vite.dev/)

## Development server
From the front-end folder, run `docker-compose up frontend-dev` to build and run the project in dev. Navigate to `http://localhost:3000/`.

## Run in production
From the front-end folder, run `docker-compose up frontend-prod` to build and run the project in production. Navigate to `http://localhost:80/`.

## Shutting down the containers
Run `docker-compose down` to stop and remove the containers.

## Linting
Firts, run `npm install` to install this Vite project's internal dependencies. Then, run `npm run lint` to check for code and formatting errors.
