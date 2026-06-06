export default function BookCard({ book, onEdit, onDelete }) {
  const isLowStock = book.stock < 5;

  return (
    <div className="book-card">
      <div className="book-card-header">
        <span className="book-genre">{book.genre}</span>
        {isLowStock && <span className="badge-low-stock">⚠️ Stock faible</span>}
      </div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">par {book.author}</p>
      <div className="book-footer">
        <span className="book-price">{book.price} €</span>
        <span className={`book-stock ${isLowStock ? 'low' : ''}`}>
          Stock : {book.stock}
        </span>
      </div>
      <div className="book-actions">
        <button className="btn btn-edit" onClick={() => onEdit(book)}>✏️ Modifier</button>
        <button className="btn btn-delete" onClick={() => onDelete(book.id)}>🗑️ Supprimer</button>
      </div>
    </div>
  );
}