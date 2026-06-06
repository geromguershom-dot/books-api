const BASE_URL = '/api/books';

export const getAllBooks = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}${query ? '?' + query : ''}`);
  if (!res.ok) throw new Error('Erreur lors du chargement des livres');
  const data = await res.json();
  return data.books;
};

export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/stats`);
  if (!res.ok) throw new Error('Erreur stats');
  return res.json();
};

export const createBook = async (book) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur création');
  return data.book;
};

export const updateBook = async (id, book) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur mise à jour');
  return data.book;
};

export const deleteBook = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erreur suppression');
  return res.json();
};