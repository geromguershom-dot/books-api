import { useState, useEffect, useCallback } from 'react';
import { getAllBooks, getStats, createBook, updateBook, deleteBook } from './api/bookApi';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import './App.css';

export default function App() {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('');
  const [inStock, setInStock] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (genre) params.genre = genre;
      if (sort) params.sort = sort;
      if (inStock) params.inStock = 'true';
      const data = await getAllBooks(params);
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, genre, sort, inStock]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error('Stats error:', err);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
    fetchStats();
  }, [fetchBooks, fetchStats]);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCreate = async (form) => {
    await createBook(form);
    showSuccess('Livre ajouté !');
    fetchBooks();
    fetchStats();
  };

  const handleUpdate = async (form) => {
    await updateBook(editingBook.id, form);
    setEditingBook(null);
    showSuccess('Livre mis à jour !');
    fetchBooks();
    fetchStats();
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce livre ?')) return;
    try {
      await deleteBook(id);
      showSuccess('Livre supprimé !');
      fetchBooks();
      fetchStats();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📚 Books API</h1>
          <p>Gestionnaire de bibliothèque — Localhost Academy</p>
        </div>
        {stats && (
          <div className="stats-bar">
            <div className="stat"><span>{stats.totalBooks}</span>Livres</div>
            <div className="stat"><span>{stats.totalStock}</span>En stock</div>
            <div className="stat"><span>{stats.avgPrice} €</span>Prix moyen</div>
            <div className="stat"><span>{stats.genres?.length}</span>Genres</div>
          </div>
        )}
      </header>

      <main className="app-main">
        {error && <div className="alert alert-error">⚠️ {error}</div>}
        {success && <div className="alert alert-success">✅ {success}</div>}

        <div className="app-layout">
          <aside className="app-sidebar">
            <BookForm
              editingBook={editingBook}
              onSubmit={editingBook ? handleUpdate : handleCreate}
              onCancel={() => setEditingBook(null)}
            />
            <div className="filters-container">
              <h3>🔍 Filtres</h3>
              <div className="form-group">
                <label>Recherche</label>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Titre ou auteur..." />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="Fiction, Fantasy..." />
              </div>
              <div className="form-group">
                <label>Trier par</label>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="">— Aucun tri —</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="title">Titre (A-Z)</option>
                </select>
              </div>
              <label className="checkbox-label">
                <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} />
                En stock uniquement
              </label>
              <button className="btn btn-outline" onClick={() => { setSearch(''); setGenre(''); setSort(''); setInStock(false); }}>
                Réinitialiser
              </button>
            </div>
          </aside>

          <section className="app-content">
            <div className="content-header">
              <h2>{books.length} livre{books.length > 1 ? 's' : ''}</h2>
              <a href="http://localhost:3000/api-docs" target="_blank" className="btn btn-outline btn-sm">
                📖 Swagger UI
              </a>
            </div>
            <BookList books={books} onEdit={setEditingBook} onDelete={handleDelete} loading={loading} />
          </section>
        </div>
      </main>
    </div>
  );
}