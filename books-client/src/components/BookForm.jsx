import { useState, useEffect } from 'react';

const emptyForm = { title: '', author: '', price: '', genre: '', stock: '' };

export default function BookForm({ editingBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title,
        author: editingBook.author,
        price: editingBook.price,
        genre: editingBook.genre || '',
        stock: editingBook.stock ?? '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors([]);
  }, [editingBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await onSubmit(form);
      setForm(emptyForm);
    } catch (err) {
      setErrors([{ message: err.message }]);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingBook ? '✏️ Modifier le livre' : '➕ Ajouter un livre'}</h2>

      {errors.length > 0 && (
        <div className="form-errors">
          {errors.map((e, i) => <p key={i}>⚠️ {e.message}</p>)}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Ex: Dune" required />
        </div>
        <div className="form-group">
          <label>Auteur *</label>
          <input name="author" value={form.author} onChange={handleChange} placeholder="Ex: Frank Herbert" required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Prix (€) *</label>
            <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} placeholder="15" required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="0" />
          </div>
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input name="genre" value={form.genre} onChange={handleChange} placeholder="Ex: Fiction, Fantasy..." />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingBook ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {editingBook && (
            <button type="button" className="btn btn-cancel" onClick={onCancel}>
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}