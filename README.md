# Shop API

Multi-category e-commerce REST API. **Node.js + Express + MySQL 8** (dynamic specs stored in a JSON column).

## Quick start

```bash
npm install
cp .env.example .env        # then edit DB_* and ADMIN_API_KEY
npm run db:migrate          # creates the database + tables
npm run db:seed             # 6 parent / 16 sub categories + 5 sample products
npm run dev                 # http://localhost:3000
```

## Structure

```
src/
├── server.js            # boot, DB check, graceful shutdown
├── app.js               # middleware stack + route mounting
├── config/              # env.js (validated env), db.js (mysql2 pool)
├── routes/              # URL -> middleware -> controller
├── controllers/         # thin HTTP layer
├── services/            # business logic + SQL
├── validators/          # zod schemas (params / query / body)
├── middleware/          # validate, adminAuth, errorHandler
├── utils/               # AppError, asyncHandler, helpers
└── db/                  # schema.sql, migrate.js, seed.js, seedData.js
```

## Endpoints (base: `/api/v1`)

| Method | Path | Notes |
|---|---|---|
| GET | `/products` | `page`, `limit` (max 100), `q`, `category` (parent or sub slug), `min_price`, `max_price`, `sort` = `newest` / `price_asc` / `price_desc` |
| GET | `/products/:id` | Full product incl. category + attributes |
| GET | `/categories` | Parent categories, each with `children` |
| POST | `/products` | Admin only: header `x-api-key: <ADMIN_API_KEY>` |

Price filters and price sorting use the **effective price** (`discount_price` if set, else `price`).

```bash
curl "http://localhost:3000/api/v1/products?q=phone&sort=price_asc&page=1&limit=20"
curl "http://localhost:3000/api/v1/products?category=electronics&min_price=10&max_price=900"

curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" -H "x-api-key: $ADMIN_API_KEY" \
  -d '{"title":"Trail Running Shoes","description":"Lightweight, grippy.","price":89.5,
       "discount_price":74.9,"category_id":8,"brand":"Peak","stock":25,
       "images":["https://example.com/shoe.jpg"],
       "attributes":{"size":["40","41","42"],"color":["Orange"],"waterproof":true}}'
```

`category_id` must be an existing id; get ids from `GET /categories`.

## Response shapes

```jsonc
// list
{ "data": [ /* products */ ], "meta": { "page": 1, "limit": 20, "total": 5, "total_pages": 1 } }
// error
{ "error": { "status": 400, "message": "Validation failed", "details": [ { "in": "query", "field": "limit", "message": "..." } ] } }
```

## Notes

- `ratings` and `review_count` are server-managed (rejected on create); update them from a future reviews feature.
- `stock = 0` always results in `status = out_of_stock`.
- Admin auth is a shared API key for now; swap `middleware/adminAuth.js` for JWT + roles when you add users.
- Search uses `LIKE`, fine for small/medium catalogs. For large catalogs add a `FULLTEXT` index or a search engine.
