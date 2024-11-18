# MAC0332-Project

## Description

## Authors
- Clara Yuki Sano
- Davi Gonçalves Bezerra Coelho
- Francisco de Castro Leal Henriques
- Júlia Melo Teixeira dos Santos
- Leonardo Bozzetto
- Natalya Silva Aragão

## Dependencies

- [Docker](https://docs.docker.com/)

## Usage

### Back-end

To build and run the back-end of this project, run the following commands in the project's `./backend` directory:

- for *development* build:
``` sh
docker-compose up backend-dev
```

- for *production* build:
``` sh
docker-compose up backend-prod
```

### Front-end

To build and run the front-end of this project, run the following commands in the project's `./front-end` directory:

- for *development*, navigate to `http://localhost:3000/` after building:
``` sh
docker-compose up frontend-dev
```

- for *production*, navigate to `http://localhost:80/` after building:
``` sh
docker-compose up frontend-prod
```

## License
