require('dotenv').config(); // Asegúrate de requerir dotenv al inicio
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // Importar bcrypt para la encriptación de contraseñas
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Mi Tienda Online',
            version: '1.0.0',
            description: 'Documentación de la API para Mi Tienda Online',
        },
    },
    apis: ['./routes/*.js'], // Cambia esta línea según la ubicación de tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para verificar el token JWT en las rutas protegidas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}

// Importar las rutas
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

// Usando variables de entorno para la URI de MongoDB y el puerto
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar con MongoDB Atlas:', err));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // Utilizar las rutas de usuarios

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola Mundo desde el backend con Express y MongoDB Atlas!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
