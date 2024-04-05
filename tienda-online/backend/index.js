require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Inicializar la aplicación Express
const app = express();

// Aplicar Helmet para la seguridad básica de HTTP
app.use(helmet());

// Permitir análisis de cuerpo JSON
app.use(bodyParser.json());

// Configuración de CORS
const allowedOrigins = ['http://localhost:3000', 'https://tu-dominio-frontend.com'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'La política de CORS para este sitio no permite el acceso desde el origen especificado.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Configuración de express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 solicitudes por ventana de tiempo
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicar el límite de tasa a todas las solicitudes
app.use(limiter);

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
  apis: ['./routes/*.js'], // Asegura la correcta ubicación de tus archivos de ruta
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para verificar el token JWT en las rutas protegidas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Importar las rutas
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const purchaseRoutes = require('./routes/purchases'); // Asegúrate de tener este archivo en tu estructura de proyecto

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar con MongoDB Atlas:', err));

// Usar rutas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/purchases', purchaseRoutes); // Integración de la nueva ruta de compras

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola Mundo desde el backend con Express y MongoDB Atlas!');
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message || 'Algo salió mal en el servidor',
    body: {},
  });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
