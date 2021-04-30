# Prueba Técnica

Este proyecto contiene AngularJs 10, Laravel 7.2, MySQL 8, Nginx y Docker v3

## Montar

Para montar los contenedores se debe ejecutar el comando `docker-compose up -d --build` sobre la raiz del repositorio, es decir donde se encuentre el archivo `docker'compose.yml`

## Base de datos

Ejecutar el comando `php artisan migrate --seed` para crear las tablas y poblarlas de forma general.
Recordar crear el archivo .env y llenar los datos de acceso a la base de datos, datos que se encuentran en `docker'compose.yml` y no olvidar ejecutar `php artisan key:generate`
En caso de tener problemas con la imagen de MySQL cambiar la version de `mysql:8`  a `mysql:5.7.22` en el archivo `docker'compose.yml`



