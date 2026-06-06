require('dotenv').config();

/*
  ANALYSE CRITIQUE

  1. Pourquoi le handler d'erreur Express doit avoir 4 paramètres ?
     Express identifie un middleware d'erreur par ses 4 paramètres :
     (err, req, res, next). Si on oublie "err", Express le traite
     comme un middleware normal et les erreurs ne sont pas gérées !

  2. Pourquoi /stats avant /:id ?
     Express lit les routes dans l'ordre. Si /:id est déclaré avant,
     "stats" serait interprété comme un ID → livre non trouvé !
     En déclarant /stats avant /:id, Express trouve la bonne route.

  3. Différence entre PUT et PATCH ?
     PUT → remplace TOUT l'objet avec les nouvelles données
     PATCH → modifie SEULEMENT les champs envoyés
*/

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/books', bookRoutes);

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur Books API !',
    docs: 'http://localhost:3000/api-docs'
  });
});

// Middlewares d'erreur — toujours en dernier !
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Books API lancée sur http://localhost:${PORT}`);
  console.log(`Swagger UI : http://localhost:${PORT}/api-docs`);
});