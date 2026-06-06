const { body, validationResult } = require('express-validator');

const bookValidationRules = [
  body('title')
    .notEmpty().withMessage('Le titre est obligatoire')
    .isLength({ min: 2 }).withMessage('Min 2 caractères'),
  
  body('author')
    .notEmpty().withMessage("L'auteur est obligatoire")
    .isLength({ min: 2 }).withMessage('Min 2 caractères'),
  
  body('price')
    .notEmpty().withMessage('Le prix est obligatoire')
    .isFloat({ min: 0 }).withMessage('Prix positif requis'),
  
  body('genre')
    .optional()
    .isString().withMessage('Genre doit être une chaîne'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock doit être positif')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ details: errors.array() });
  }
  next();
};

module.exports = { bookValidationRules, validate };