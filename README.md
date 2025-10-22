# 🐳 Debugging Dockerfiles en VS Code

¡Hola developer 👋🏻! Este proyecto es una guía práctica para aprender a debuggear Dockerfiles y aplicaciones containerizadas en Visual Studio Code.

## 📚 Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Instalación y Setup](#instalación-y-setup)
3. [Demos de Debugging](#demos-de-debugging)
4. [Comandos Útiles](#comandos-útiles)
5. [Buenas Prácticas](#buenas-prácticas)

---

## 📁 Estructura del Proyecto

```
debugging-dockerfiles/
├── app.js                    # Aplicación Express simple
├── index.html               # Interfaz web interactiva
├── package.json            # Dependencias de Node.js
├── Dockerfile              # Dockerfile educativo (con conceptos)
├── Dockerfile.nodejs       # Dockerfile optimizado para Node.js
├── Dockerfile.simple       # Dockerfile minimalista
├── .dockerignore          # Archivos a ignorar en Docker
├── REFERENCIA.md          # Referencia rápida de comandos
└── README.md              # Este archivo
```

---

## 🚀 Instalación y Setup

### 1. Instalar Dependencias Locales
```bash
npm install
```

### 2. Ejecutar Localmente (sin Docker)
```bash
npm start
# Acceder a http://localhost:3000
```

### 3. Construir la Imagen Docker
```bash
docker build -t express-app:1.0 -f Dockerfile.nodejs .
```

### 4. Ejecutar el Contenedor
```bash
docker run -p 3000:3000 express-app:1.0
# Acceder a http://localhost:3000
```

---

## 🔍 Demos de Debugging

### Demo 1: Inspeccionar Capas de la Imagen

**Objetivo:** Ver qué sucede en cada capa del Dockerfile

```bash
# Construir con output detallado
docker build -t express-app:debug -f Dockerfile.nodejs . --progress=plain

# Ver el historial de capas
docker history express-app:debug

# Inspeccionar una imagen específica
docker image inspect express-app:debug
```

**Debug Console en VS Code:**
```javascript
// Si en el Debug Console pones 'exec', te enganchas al contenedor 
// que está preparando la imagen
exec /bin/sh
ls -la /app
cat package.json
```

---

### Demo 2: Ejecutar Contenedor con Bash Interactivo

**Objetivo:** Entrar al contenedor corriendo para inspeccionarlo

```bash
# Ejecutar con bash interactivo
docker run -it express-app:1.0 /bin/sh

# Dentro del contenedor:
ls -la
pwd
env
ps aux
```

---

### Demo 3: Debuggear Errores de Construcción

**Objetivo:** Identificar y solucionar problemas en el build

**Archivo de prueba con error: `Dockerfile.error`**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package.json .
RUN npm install
# ERROR: Esta línea fallará si falta un archivo
COPY nonexistent.js .
```

**Para debuggear:**
```bash
# Esto fallará
docker build -t express-app:error -f Dockerfile.error .

# Ver qué sucedió en el paso anterior (crear contenedor temporal)
docker run -it sha256:<image-id> /bin/sh

# Verificar qué archivos existen
ls -la
```

---

### Demo 4: Debugging de Aplicación en Contenedor

**Objetivo:** Debuggear el código Node.js dentro del contenedor

**Archivo: `Dockerfile.debug`**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000 9229

# Ejecutar con flag de debug
CMD ["node", "--inspect-brk=0.0.0.0:9229", "app.js"]
```

**Construir y ejecutar:**
```bash
docker build -t express-app:debug -f Dockerfile.debug .
docker run -p 3000:3000 -p 9229:9229 express-app:debug
```

**Conectar el Debugger de VS Code:**
1. Abre VS Code
2. Ve a Run > Add Configuration
3. Selecciona "Node.js"
4. Crea esta configuración en `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker Node Debugger",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "restart": true,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

5. Presiona F5 o usa Run > Start Debugging
6. Ahora puedes:
   - ✅ Poner breakpoints en el código
   - ✅ Ver variables
   - ✅ Ejecutar paso a paso

---

### Demo 5: Monitoreo de Logs en Tiempo Real

**Objetivo:** Ver logs de múltiples contenedores

```bash
# Ejecutar contenedor con nombre
docker run -d --name myapp -p 3000:3000 express-app:1.0

# Ver logs en vivo
docker logs -f myapp

# Ver últimas 50 líneas
docker logs --tail 50 myapp

# Con timestamps
docker logs -f --timestamps myapp
```

---

### Demo 6: Inspeccionar Sistema de Archivos del Contenedor

**Objetivo:** Ver qué hay dentro del contenedor

```bash
# Ejecutar contenedor en background
docker run -d --name inspector express-app:1.0

# Ejecutar comandos sin entrar
docker exec inspector ls -la /app
docker exec inspector cat /app/package.json
docker exec inspector env

# Copiar archivos desde contenedor
docker cp inspector:/app/package.json ./backup-package.json

# Copiar archivos hacia contenedor
docker cp ./app.js inspector:/app/app.js

# Dejar de correr
docker stop inspector
docker rm inspector
```

---

### Demo 7: Comparar Tamaños de Imágenes

**Objetivo:** Optimizar el tamaño de la imagen

```bash
# Ver tamaño de todas las imágenes
docker images

# Comparar diferentes Dockerfiles
docker build -t app:simple -f Dockerfile.simple .
docker build -t app:nodejs -f Dockerfile.nodejs .
docker build -t app:full -f Dockerfile .

# Ver tamaño de capas
docker history app:nodejs

# Calcular espacio total
docker system df
```

---

### Demo 8: Usar Docker Compose para Múltiples Servicios

**Archivo: `docker-compose.yml`**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.nodejs
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    restart: unless-stopped
```

**Ejecutar:**
```bash
# Construir y ejecutar
docker-compose up

# En background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

### Demo 9: Networking - Comunicación Entre Contenedores

**Objetivo:** Hacer que dos contenedores se comuniquen

```bash
# Crear una red
docker network create mynetwork

# Ejecutar contenedor en la red
docker run -d --name app1 --network mynetwork express-app:1.0

# Dentro de otro contenedor, puedo hacer ping por nombre
docker run -it --network mynetwork ubuntu
# Dentro:
ping app1
```

---

### Demo 10: Volúmenes y Persistencia de Datos

**Objetivo:** Compartir archivos entre host y contenedor

```bash
# Ejecutar con volumen
docker run -v /Users/gis/Dev/debugging-dockerfiles:/app -p 3000:3000 express-app:1.0

# Cambios en el host se reflejan en el contenedor
# Útil para desarrollo

# Ver volúmenes
docker volume ls

# Crear volumen nombrado
docker volume create mydata

# Usar volumen nombrado
docker run -v mydata:/data -p 3000:3000 express-app:1.0
```

---

## 🛠️ Comandos Útiles

### Construcción
```bash
docker build -t nombre:tag -f Dockerfile .
docker build -t nombre:tag --no-cache .
docker build -t nombre:tag --progress=plain .
```

### Ejecución
```bash
docker run -p 3000:3000 imagen:tag
docker run -it imagen:tag /bin/sh
docker run -d --name miapp imagen:tag
docker run -e VAR=valor imagen:tag
```

### Inspección
```bash
docker ps                    # Contenedores corriendo
docker ps -a                 # Todos los contenedores
docker images               # Imágenes disponibles
docker logs -f container-id # Ver logs
docker exec -it id comando  # Ejecutar comando
docker inspect container-id # Detalles completos
```

### Limpieza
```bash
docker rm container-id       # Eliminar contenedor
docker rmi image-id         # Eliminar imagen
docker system prune         # Limpiar todo
docker system prune -a      # Limpiar agresivamente
```

---

## ✅ Buenas Prácticas

1. **Especifica versiones exactas**
   ```dockerfile
   FROM node:18.17.0-alpine  # ✅ Bien
   FROM node:18              # ⚠️ Puede cambiar
   FROM node:latest          # ❌ No recomendado
   ```

2. **Usa imágenes alpine**
   ```dockerfile
   FROM node:18-alpine       # ~165MB
   FROM node:18              # ~900MB
   ```

3. **Agrupa comandos RUN**
   ```dockerfile
   # ❌ Crea 2 capas
   RUN apt-get update
   RUN apt-get install curl
   
   # ✅ Crea 1 capa
   RUN apt-get update && apt-get install curl
   ```

4. **Ordena layers por cambio frecuente**
   ```dockerfile
   COPY package.json .        # Cambia poco
   RUN npm install            # Cacheable
   COPY . .                   # Cambia más
   ```

5. **No ejecutes como root**
   ```dockerfile
   RUN adduser -S appuser
   USER appuser
   ```

6. **Usa .dockerignore**
   ```
   node_modules
   .git
   .env
   ```

---

## 🐛 Troubleshooting

### "Cannot connect to Docker daemon"
```bash
# En macOS, asegúrate que Docker Desktop esté corriendo
open /Applications/Docker.app
```

### "Port already in use"
```bash
# Ver qué está usando el puerto
lsof -i :3000

# Cambiar puerto
docker run -p 8080:3000 imagen:tag
```

### "Out of disk space"
```bash
# Limpiar imágenes no usadas
docker system prune -a

# Ver uso de disco
docker system df
```

---

## 📖 Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [VS Code Docker Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- `REFERENCIA.md` - Guía rápida de comandos Dockerfile

---

## 🎯 Próximos Pasos

1. ✅ Ejecuta la app localmente
2. ✅ Construye la imagen Docker
3. ✅ Ejecuta el contenedor
4. ✅ Debuggea usando las demos
5. ✅ Experimenta con diferentes Dockerfiles
6. ✅ Crea tu propio proyecto containerizado

¡Happy debugging! 🚀