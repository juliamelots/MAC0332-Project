# MAC0332 - Vite + React + Typescript developer guide

## Dependencies
- [Docker](https://docs.docker.com/)

### Internal dependencies
These dependencies are handled by Docker when running the servers and currently are only required for linting the front-end application.
- [Node.js](https://nodejs.org/en)
- [Vite](https://vite.dev/)
- [Nginx](https://nginx.org/en/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)

## Development server
From the front-end folder, run `docker-compose up frontend-dev` to build and run the project in development. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Production server
From the front-end folder, run `docker-compose up frontend-prod` to build and run the project in production. Navigate to `http://localhost:80/`.

## Shell

From the front-end folder, run  `docker-compose run frontend-dev sh` to run an interactive shell inside the development container. All changes to source files will be automatically detected.

### Linting
From the container's shell, run `npm run lint` to check for code and formatting errors.

### Testing
From the container's shell, run `npm run test` to run all test suites using .

## Shutting down the containers
Run `docker-compose down` to stop and remove the containers.
