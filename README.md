# 🐳 Depurar Dockerfiles con Docker DX

¡Hola developer 👋🏻! Ahora puedes **depurar archivos Dockerfile** de una forma súper sencilla con la extensión **Docker DX** en Visual Studio Code.

## 🚀 ¿Qué necesitas?

Solo dos cosas:

1. **La extensión Docker DX** instalada en Visual Studio Code
2. **El archivo de configuración `.vscode/launch.json`** (ya está en este repositorio)

## 📋 Configuración

Este repositorio ya incluye el archivo `.vscode/launch.json` configurado para depurar Dockerfiles:

```json
{
    "name": "Docker: Build",
    "type": "dockerfile",
    "request": "launch",
    "dockerfile": "Dockerfile",
    "contextPath": "${workspaceFolder}",
    "args": [
        "--build-arg",
        "NODE_ENV=development",
        "--build-arg",
        "IMAGE_TAG=20-alpine"
    ]
}
```

## 🎯 Cómo usar

1. **Instala la extensión Docker DX** en Visual Studio Code
2. **Abre este proyecto** en VS Code
3. **Ve al panel de Debug** (Ctrl+Shift+D o Cmd+Shift+D)
4. **Selecciona "Docker: Build"** en el menú desplegable
5. **Presiona F5** o haz clic en el botón de play

¡Eso es todo! Ahora puedes depurar tu Dockerfile paso a paso, ver las variables de construcción, y entender exactamente qué está pasando en cada capa de tu imagen Docker.

## ✨ Beneficios

- ✅ Depura Dockerfiles de forma interactiva
- ✅ Visualiza variables de construcción
- ✅ Entiende cada paso del proceso de build
- ✅ Identifica problemas rápidamente

¡Happy debugging! 🚀