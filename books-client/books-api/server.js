/**
 * ANALYSE CRITIQUE
 *
 * 1. Pourquoi le handler d'erreur Express doit-il avoir exactement 4 paramètres ?
 *    Express identifie un middleware de gestion d'erreurs UNIQUEMENT si sa fonction
 *    a 4 paramètres : (err, req, res, next). Si on en oublie un (ex: seulement 3),
 *    Express le traite comme un middleware normal et n'intercepte jamais les erreurs
 *    passées via next(error). Le résultat : toutes les erreurs sont ignorées et le
 *    client reçoit une réponse vide ou un crash serveur.
 *
 * 2. Pourquoi GET /api/books/stats doit-elle être déclarée AVANT GET /api/books/:id ?
 *    Express parcourt les routes dans l'ordre de déclaration. Si /:id est déclaré en
 *    premier, la requête GET /api/books/stats sera interceptée avec id = "stats",
 *    parseInt("stats") donnera NaN, et la route renverra 404 au lieu des statistiques.
 *    Il faut toujours déclarer les routes statiques avant les routes dynamiques.
 *
 * 3. Quelle est la différence entre PUT et PATCH ?
 *    PUT = mise à jour COMPLÈTE : on remplace tout l'objet. Si un champ est absent
 *    du body, il est écrasé/supprimé. Le client doit envoyer tous les champs.
 *    PATCH = mise à jour PARTIELLE : on modifie seulement les champs fournis.
 *    Les champs non envoyés conservent leur valeur actuelle. Plus économique
 *    et flexible que PUT pour de petites modifications.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const bookRoutes = require('./routes/bookRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/books', bookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'books-api running', port: PORT });
});

// 404 handler
app.use(notFound);

// Global error handler (4 paramètres obligatoires)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`books-api running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
