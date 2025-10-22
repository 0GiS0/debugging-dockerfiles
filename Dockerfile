# 🔧 Argumentos de construcción
ARG IMAGE_TAG=18-alpine

# 🐳 Imagen base
FROM node:${IMAGE_TAG}

# 🔧 Argumentos de construcción
ARG NODE_ENV=production

# Check variables de construcción
RUN echo IMAGE_TAG=$IMAGE_TAG NODE_ENV=$NODE_ENV

# 📋 Metadatos
LABEL maintainer="tu-email@ejemplo.com" \    
      description="Aplicación Express en Docker"

# 🌍 Variables de entorno
ENV NODE_ENV=${NODE_ENV} \
    PORT=5000

# 📁 Establecer directorio de trabajo
WORKDIR /app

# 📦 Copiar archivos de dependencias
COPY package*.json ./

# ⚙️ Instalar dependencias
RUN npm install --production

# 💻 Copiar código de la aplicación
COPY . .

# 🔌 Exponer puerto (documentación - el puerto real se controla mediante ENV PORT)
EXPOSE 5000

# 🚀 Comando de inicio
CMD ["npm", "start"]
