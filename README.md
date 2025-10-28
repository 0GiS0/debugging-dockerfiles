# 🛠️ Depura Dockerfiles con VS Code: ¡añade breakpoints paso a paso! 🐳

<div align="center">

[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UC140iBrEZbOtvxWsJ-Tb0lQ?style=for-the-badge&logo=youtube&logoColor=white&color=red)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)
[![GitHub followers](https://img.shields.io/github/followers/0GiS0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0GiS0)
[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Sígueme-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/)
[![X Follow](https://img.shields.io/badge/X-Sígueme-black?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/0GiS0)

</div>

¡Hola developer 👋🏻! Ahora puedes **depurar archivos Dockerfile** de una forma súper sencilla con la extensión **Docker DX** en Visual Studio Code. Si quieres verlo en directo puedes echar un vistazo a este vídeo de mi canal de YouTube de tan solo 8 minutos.

<a href="https://youtu.be/vxGMUK-vU-0">
 <img src="https://img.youtube.com/vi/vxGMUK-vU-0/maxresdefault.jpg" alt="🛠️ Depura Dockerfiles con VS Code: ¡añade breakpoints paso a paso! 🐳 | Cap.18" width="100%" />
</a>

## 🚀 ¿Qué necesitas?

Solo tres cosas:

1. Asegurarte de tener **una version de Buildkit que soporte esta funcionalidad** (v.29.0 o superior) Para comprobarlo solo tienes que ejecutar el siguiente comando en tu terminal:

   ```bash
   docker buildx version
   ```

   Si tu versión es anterior a la 29.0, actualiza Docker Desktop a la última versión disponible.
1. **La extensión Docker DX** instalada en Visual Studio Code
2. **El archivo de configuración `.vscode/launch.json`** (ya está en este repositorio)

## 📋 Configuración

Este repositorio ya incluye el archivo `.vscode/launch.json` configurado para depurar Dockerfiles:

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Development",
            "type": "dockerfile",
            "request": "launch",
            "dockerfile": "Dockerfile",
            "contextPath": "${workspaceFolder}",
            "args": [
                "--build-arg",
                "FOLDER=web",
                "--build-arg",
                "NODE_ENV=development",
                "--build-arg",
                "RANDOM_ARG=1234"
            ]
        },
        {
            "name": "Production",
            "type": "dockerfile",
            "request": "launch",
            "dockerfile": "Dockerfile",
            "contextPath": "${workspaceFolder}",
            "args": [
                "--build-arg",
                "FOLDER=webapp",
                "--build-arg",
                "NODE_ENV=production",
                "--build-arg",
                "RANDOM_ARG=5678"
            ]
        }
    ]
}
```

En este como ves tengo dos configuraciones: **Development** y **Production**. Puedes modificarlas según tus necesidades, agregando o quitando argumentos de construcción (`--build-arg`).

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


<div align="center">

### 🎯 ¿Te ha resultado útil este contenido?

**¡La mejor forma de agradecerlo es con una suscripción!** 

Cada nuevo suscriptor me motiva a seguir creando contenido de calidad y mantener estos repositorios actualizados. 

[![Suscríbete Ahora](https://img.shields.io/badge/🔔%20SUSCRÍBETE%20AHORA-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)

¡Happy debugging! 🚀

</div>