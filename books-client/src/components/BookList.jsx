import BookCard from './BookCard';

export default function BookList({ books, onEdit, onDelete, loading }) {
  if (loading) return <p className="loading">Chargement des livres...</p>;
  if (!books.length) return <p className="empty">Aucun livre trouvé.</p>;

  return (
    <div className="books-grid">
      {books.map(book => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}