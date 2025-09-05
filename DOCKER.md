# Clase 4 — Introducción a Docker

## Introducción a Docker

### Conceptos clave
- **Imagen**: plantilla inmutable que define qué se va a ejecutar.
- **Contenedor**: instancia en ejecución de una imagen.
- **Dockerfile**: archivo de configuración para construir imágenes personalizadas.
- **Volúmenes**: permiten persistir datos más allá de la vida de un contenedor.
- **Redes privadas**: conectan contenedores entre sí sin exponer servicios hacia fuera.

### Comandos básicos

```bash
# Verificar instalación
docker --version
docker info

# Primer contenedor
docker run hello-world

# Contenedor interactivo
docker run -it ubuntu bash

# Levantar servicio con puertos
docker run -d -p 8080:80 nginx

# Listar contenedores
docker ps

# Detener un contenedor
docker stop <container_id>
```

### Redes privadas y conexión entre contenedores

```bash
# Crear red privada
docker network create micro_red

# Levantar PostgreSQL en esa red
docker run -d --name db --network micro_red postgres:15

# Conectar desde otro contenedor cliente
docker run -it --rm --network micro_red postgres:15 psql -h db -U postgres
```

**Actividad práctica:**  
Levantar un contenedor PostgreSQL y conectarse desde otro contenedor cliente en la misma red.

---

## Integración con Docker Compose

### Conceptos clave
- **Docker Compose**: herramienta para definir y correr múltiples servicios con un solo comando.
- **Archivo `docker-compose.yml`**: describe cómo levantar frontend, backend y base de datos juntos.

### Ejemplo básico de `docker-compose.yml`

```yaml
version: "3.8"
services:
  frontend:
    image: node:20
    working_dir: /app
    volumes:
      - ./:/app
    ports:
      - "3000:3000"
    command: sh -c "npm install && npm run dev"

  backend:
    image: node:20
    working_dir: /app
    volumes:
      - ./backend:/app
    ports:
      - "4000:4000"
    command: sh -c "npm install && npm run dev"
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: example
    ports:
      - "5432:5432"
```

### Ejecución

```bash
# Levantar todos los servicios
docker compose up

# Levantarlos en segundo plano
docker compose up -d

# Detener servicios
docker compose down
```

**Actividad práctica:**  
1. Cambiar los puertos del backend.  
2. Agregar un volumen persistente a la base de datos.  
3. Probar levantar y apagar los servicios.  

---

## Cierre de la clase
### Preguntas rápidas
- ¿Cuál es la diferencia entre contenedor e imagen?
- ¿Qué hace `docker ps`?
- ¿Para qué sirve una red privada en Docker?
- ¿Qué ventaja ofrece Docker Compose frente a ejecutar `docker run`?

### Trabajo autónomo
- Documentar en README el flujo para levantar los servicios con `docker compose`.
- Leer sobre `Dockerfile` para la próxima clase.
