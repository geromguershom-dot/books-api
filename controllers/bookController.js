let books = [
  { id: 1, title: "Dune", author: "Frank Herbert", price: 15, genre: "Science Fiction", stock: 10 },
  { id: 2, title: "1984", author: "George Orwell", price: 12, genre: "Fiction", stock: 5 },
  { id: 3, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", price: 8, genre: "Fiction", stock: 20 },
  { id: 4, title: "Harry Potter", author: "J.K. Rowling", price: 20, genre: "Fantasy", stock: 15 },
  { id: 5, title: "Le Seigneur des Anneaux", author: "J.R.R. Tolkien", price: 25, genre: "Fantasy", stock: 3 },
  { id: 6, title: "Fondation", author: "Isaac Asimov", price: 14, genre: "Science Fiction", stock: 2 },
];
let nextId = 7;

const getAllBooks = (req, res, next) => {
  try {
    let result = [...books];
    if (req.query.genre) result = result.filter(b => b.genre.toLowerCase() === req.query.genre.toLowerCase());
    if (req.query.search) { const s = req.query.search.toLowerCase(); result = result.filter(b => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s)); }
    if (req.query.minPrice) result = result.filter(b => b.price >= parseFloat(req.query.minPrice));
    if (req.query.maxPrice) result = result.filter(b => b.price <= parseFloat(req.query.maxPrice));
    if (req.query.inStock === 'true') result = result.filter(b => b.stock > 0);
    if (req.query.sort === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (req.query.sort === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (req.query.sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
    res.status(200).json({ books: result });
  } catch (err) { next(err); }
};

const getStats = (req, res, next) => {
  try {
    const totalBooks = books.length;
    const totalStock = books.reduce((sum, b) => sum + b.stock, 0);
    const avgPrice = books.reduce((sum, b) => sum + b.price, 0) / totalBooks;
    const genres = [...new Set(books.map(b => b.genre))];
    res.status(200).json({ totalBooks, totalStock, avgPrice: parseFloat(avgPrice.toFixed(2)), genres });
  } catch (err) { next(err); }
};

const getLowStock = (req, res, next) => {
  try {
    res.status(200).json({ books: books.filter(b => b.stock < 5) });
  } catch (err) { next(err); }
};

const getBookById = (req, res, next) => {
  try {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) { const e = new Error('Livre non trouvé'); e.statusCode = 404; return next(e); }
    res.status(200).json({ book });
  } catch (err) { next(err); }
};

const createBook = (req, res, next) => {
  try {
    const { title, author, price, genre, stock } = req.body;
    const newBook = { id: nextId++, title, author, price: parseFloat(price), genre: genre || 'Unknown', stock: stock !== undefined ? parseInt(stock) : 0 };
    books.push(newBook);
    res.status(201).json({ message: 'Livre créé !', book: newBook });
  } catch (err) { next(err); }
};

const updateBook = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) { const e = new Error('Livre non trouvé'); e.statusCode = 404; return next(e); }
    const { title, author, price, genre, stock } = req.body;
    books[index] = { id, title, author, price: parseFloat(price), genre: genre || books[index].genre, stock: stock !== undefined ? parseInt(stock) : books[index].stock };
    res.status(200).json({ message: 'Livre mis à jour !', book: books[index] });
  } catch (err) { next(err); }
};

const adjustStock = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) { const e = new Error('Livre non trouvé'); e.statusCode = 404; return next(e); }
    const { adjustment } = req.body;
    if (adjustment === undefined || isNaN(parseInt(adjustment))) { const e = new Error('adjustment requis'); e.statusCode = 400; return next(e); }
    books[index].stock = Math.max(0, books[index].stock + parseInt(adjustment));
    res.status(200).json({ message: 'Stock ajusté !', book: books[index] });
  } catch (err) { next(err); }
};

const deleteBook = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) { const e = new Error('Livre non trouvé'); e.statusCode = 404; return next(e); }
    const deleted = books.splice(index, 1);
    res.status(200).json({ message: 'Livre supprimé !', book: deleted[0] });
  } catch (err) { next(err); }
};

module.exports = { getAllBooks, getStats, getLowStock, getBookById, createBook, updateBook, adjustStock, deleteBook };