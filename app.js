// Aplicación simple con Express
// Para ejecutar: npm install express
// Luego: node app.js

const express = require('express');
const path = require('path');
const app = express();

// Puerto desde variable de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '.')));

// ============================================
// RUTAS BÁSICAS
// ============================================

// Ruta raíz - Sirve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta de health check (verificar si el servidor está vivo)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ============================================
// API REST SIMPLE - USUARIOS
// ============================================

// Base de datos simulada en memoria
const usuarios = [
  { id: 1, nombre: 'Juan', email: 'juan@ejemplo.com' },
  { id: 2, nombre: 'María', email: 'maria@ejemplo.com' }
];

// GET - Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  res.json({
    cantidad: usuarios.length,
    usuarios: usuarios
  });
});

// GET - Obtener un usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  if (!usuario) {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      id: id
    });
  }
  
  res.json(usuario);
});

// POST - Crear nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  
  // Validación básica
  if (!nombre || !email) {
    return res.status(400).json({
      error: 'El nombre y email son requeridos'
    });
  }
  
  const nuevoUsuario = {
    id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
    nombre,
    email
  };
  
  usuarios.push(nuevoUsuario);
  
  res.status(201).json({
    mensaje: 'Usuario creado exitosamente',
    usuario: nuevoUsuario
  });
});

// ============================================
// MANEJO DE ERRORES
// ============================================

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl,
    metodo: req.method
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Servidor Express iniciado            ║
╠════════════════════════════════════════╣
║   Escuchando en: http://localhost:${PORT}    ║
║   Ambiente: ${process.env.NODE_ENV || 'development'}             ║
║   PID: ${process.pid}                       ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Señal SIGTERM recibida. Cerrando servidor gracefully...');
  process.exit(0);
});
