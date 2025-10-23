# 🐳 Imagen base
FROM node:22-alpine

# 🔧 Argumentos de construcción
ARG FOLDER=/app

ARG RANDOM_ARG=unused_value

# 🔧 Argumentos de construcción
ARG NODE_ENV=production

# Check variables de construcción
RUN echo NODE_ENV=$NODE_ENV

# 📋 Metadatos
LABEL maintainer="tu-email@ejemplo.com" \    
      description="Aplicación Express en Docker"

# 🌍 Variables de entorno
ENV NODE_ENV=${NODE_ENV} \
    PORT=5000

# 📁 Establecer directorio de trabajo
WORKDIR ${FOLDER}

# 📦 Copiar archivos de dependencias
COPY package*.json ./

# ⚙️ Instalar dependencias
RUN npm install

# 💻 Copiar código de la aplicación
COPY . .

# 🔌 Exponer puerto (documentación - el puerto real se controla mediante ENV PORT)
EXPOSE 5000

# 🚀 Comando de inicio
CMD ["npm", "start"]
