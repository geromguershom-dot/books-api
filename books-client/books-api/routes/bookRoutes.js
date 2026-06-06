// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { bookValidationRules, validate } = require('../middleware/validate');
const {
  getAllBooks,
  getStats,
  getLowStock,
  getBookById,
  createBook,
  updateBook,
  adjustStock,
  deleteBook,
} = require('../controllers/bookController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required: [title, author, price]
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Dune
 *         author:
 *           type: string
 *           example: Frank Herbert
 *         price:
 *           type: number
 *           example: 15
 *         genre:
 *           type: string
 *           example: Science Fiction
 *         stock:
 *           type: integer
 *           example: 10
 */

/**
 * @swagger
 * /api/books/stats:
 *   get:
 *     summary: Statistiques globales des livres
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Statistiques retournées
 */
router.get('/stats', getStats);

/**
 * @swagger
 * /api/books/low-stock:
 *   get:
 *     summary: Livres avec stock < 5 (BONUS)
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Liste des livres en stock faible
 */
router.get('/low-stock', getLowStock);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Récupérer tous les livres
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema: { type: string }
 *         description: Filtrer par genre
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Recherche dans titre ou auteur
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *         description: Prix minimum
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *         description: Prix maximum
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [price_asc, price_desc, title] }
 *         description: Tri des résultats
 *       - in: query
 *         name: inStock
 *         schema: { type: boolean }
 *         description: Afficher seulement les livres en stock (BONUS)
 *     responses:
 *       200:
 *         description: Liste des livres
 */
router.get('/', getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Récupérer un livre par ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Livre trouvé
 *       404:
 *         description: Livre non trouvé
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Créer un nouveau livre
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Livre créé
 *       400:
 *         description: Validation échouée
 */
router.post('/', bookValidationRules, validate, createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Mettre à jour un livre (remplacement complet)
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Livre mis à jour
 *       404:
 *         description: Livre non trouvé
 */
router.put('/:id', bookValidationRules, validate, updateBook);

/**
 * @swagger
 * /api/books/{id}/stock:
 *   patch:
 *     summary: Ajuster le stock d'un livre (BONUS)
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { adjustment: 5 }
 *     responses:
 *       200:
 *         description: Stock ajusté
 *       404:
 *         description: Livre non trouvé
 */
router.patch('/:id/stock', adjustStock);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Supprimer un livre
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Livre supprimé
 *       404:
 *         description: Livre non trouvé
 */
router.delete('/:id', deleteBook);

module.exports = router;
