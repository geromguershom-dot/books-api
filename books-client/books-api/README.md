# 📚 Books API — Full Stack

API REST Express + Frontend React — Localhost Academy, Month 2 Week 2.

## 📁 Structure du projet

```
books-api/          → Backend Express (port 3000)
books-client/       → Frontend React + Vite (port 5173)
```

## 🚀 Installation et démarrage

### Backend

```bash
cd books-api
npm install
node server.js
```

Créer un fichier `.env` dans `books-api/` :
```
PORT=3000
NODE_ENV=development
```

### Frontend

```bash
cd books-client
npm install
npm run dev
```

- **API** → http://localhost:3000
- **Frontend** → http://localhost:5173
- **Swagger UI** → http://localhost:3000/api-docs

---

## 📌 Endpoints

| Méthode | URL | Description | Status |
|---------|-----|-------------|--------|
| GET | `/api/books` | Tous les livres (avec filtres) | 200 |
| GET | `/api/books/stats` | Statistiques globales | 200 |
| GET | `/api/books/low-stock` | Livres avec stock < 5 (BONUS) | 200 |
| GET | `/api/books/:id` | Un livre par ID | 200 / 404 |
| POST | `/api/books` | Créer un livre | 201 / 400 |
| PUT | `/api/books/:id` | Mise à jour complète | 200 / 404 |
| PATCH | `/api/books/:id/stock` | Ajuster le stock (BONUS) | 200 / 404 |
| DELETE | `/api/books/:id` | Supprimer un livre | 200 / 404 |

---

## 🔍 Query params — GET /api/books

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `search` | string | Recherche dans titre ou auteur | `?search=dune` |
| `genre` | string | Filtrer par genre exact | `?genre=Fiction` |
| `minPrice` | number | Prix minimum | `?minPrice=10` |
| `maxPrice` | number | Prix maximum | `?maxPrice=50` |
| `sort` | string | Tri : `price_asc`, `price_desc`, `title` | `?sort=price_asc` |
| `inStock` | boolean | Seulement les livres en stock (BONUS) | `?inStock=true` |

---

## ✅ Bonus implémentés

- `GET /api/books/low-stock` — livres avec stock < 5
- `PATCH /api/books/:id/stock` — ajuster le stock sans descendre sous 0
- Badge "⚠️ Stock faible" dans le frontend quand stock < 5
- Filtre `?inStock=true` + checkbox dans le frontend

---

Built with ❤️ at **Localhost Academy** — Yaoundé, Cameroon.
