<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
````
yarn install
````
3. Tener NEST CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.ene.template__ y renombrar la copia __.env__

6. Llenar las variables de entornos definidas en __.env__

7. Reconstruir DDBB con el Seed
```
http://localhost:3000/api/seed
```

6. Ejecutar la aplicacion en __DEV__
```
yarn start:dev
```

## Stack Usado
* MongoDB
* Nest