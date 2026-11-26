const { pool } = require('../config/db');
const AppError = require('../utils/AppError');
const { slugify, escapeLike, parseJson } = require('../utils/helpers');
const { categoryExists } = require('./category.service');

// Price the customer actually pays (used for filtering and sorting).
const EFFECTIVE_PRICE = 'COALESCE(p.discount_price, p.price)';

const SORTS = {
  newest: 'p.created_at DESC, p.id DESC',
  price_asc: `${EFFECTIVE_PRICE} ASC, p.id ASC`,
  price_desc: `${EFFECTIVE_PRICE} DESC, p.id DESC`,
};

const FROM_CLAUSE = `
  FROM products p
  JOIN categories c ON c.id = p.category_id
  LEFT JOIN categories pc ON pc.id = c.parent_id`;

const SELECT_COLUMNS = `
  SELECT p.id, p.title, p.slug, p.description, p.price, p.discount_price,
         p.category_id, p.brand, p.stock, p.ratings, p.review_count,
         p.images, p.status, p.attributes, p.created_at, p.updated_at,
         c.name AS category_name, c.slug AS category_slug,
         pc.name AS parent_category_name, pc.slug AS parent_category_slug`;

function toProductDto(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    price: row.price,
    discount_price: row.discount_price,
    category: {
      id: row.category_id,
      name: row.category_name,
      slug: row.category_slug,
      parent: row.parent_category_slug
        ? { name: row.parent_category_name, slug: row.parent_category_slug }
        : null,
    },
    brand: row.brand,
    stock: row.stock,
    ratings: row.ratings,
    review_count: row.review_count,
    images: parseJson(row.images, []),
    status: row.status,
    attributes: parseJson(row.attributes, {}),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function listProducts({ page, limit, q, category, min_price, max_price, sort }) {
  const where = [];
  const params = [];

  if (q) {
    const like = `%${escapeLike(q)}%`;
    where.push('(p.title LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)');
    params.push(like, like, like);
  }

  if (category) {
    // Matches the category itself OR any of its subcategories (when it is a parent).
    where.push('(c.slug = ? OR pc.slug = ?)');
    params.push(category, category);
  }

  if (min_price !== undefined) {
    where.push(`${EFFECTIVE_PRICE} >= ?`);
    params.push(min_price);
  }

  if (max_price !== undefined) {
    where.push(`${EFFECTIVE_PRICE} <= ?`);
    params.push(max_price);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const offset = (page - 1) * limit;

  const [[countRow]] = await pool.query(
    `SELECT COUNT(*) AS total ${FROM_CLAUSE} ${whereSql}`,
    params,
  );
  const [rows] = await pool.query(
    `${SELECT_COLUMNS} ${FROM_CLAUSE} ${whereSql} ORDER BY ${SORTS[sort]} LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  );

  const total = Number(countRow.total);
  return {
    data: rows.map(toProductDto),
    meta: { page, limit, total, total_pages: Math.ceil(total / limit) },
  };
}

async function getProductById(id) {
  const [rows] = await pool.query(`${SELECT_COLUMNS} ${FROM_CLAUSE} WHERE p.id = ? LIMIT 1`, [id]);
  if (rows.length === 0) throw new AppError(404, 'Product not found');
  return toProductDto(rows[0]);
}

async function createProduct(input) {
  if (!(await categoryExists(input.category_id))) {
    throw new AppError(400, 'Validation failed', [
      { in: 'body', field: 'category_id', message: 'Category does not exist' },
    ]);
  }

  // Zero stock always means out_of_stock, regardless of what was sent.
  const status = input.stock === 0 ? 'out_of_stock' : input.status || 'active';
  const baseSlug = slugify(input.title) || 'product';

  // slug has a UNIQUE index; on collision retry with a short random suffix.
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const slug =
      attempt === 0 ? baseSlug : `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
    try {
      const [result] = await pool.query(
        `INSERT INTO products
           (title, slug, description, price, discount_price, category_id, brand,
            stock, images, status, attributes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          input.title,
          slug,
          input.description,
          input.price,
          input.discount_price ?? null,
          input.category_id,
          input.brand,
          input.stock,
          JSON.stringify(input.images),
          status,
          JSON.stringify(input.attributes),
        ],
      );
      return getProductById(result.insertId);
    } catch (err) {
      if (err.code !== 'ER_DUP_ENTRY' || attempt === 3) throw err;
    }
  }
  /* istanbul ignore next */
  throw new AppError(500, 'Could not generate a unique slug');
}

module.exports = { listProducts, getProductById, createProduct };
