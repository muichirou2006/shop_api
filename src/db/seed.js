// Wipes categories + products and inserts the mock data. Run: npm run db:seed
const { pool } = require('../config/db');
const { slugify } = require('../utils/helpers');
const { categories, products } = require('./seedData');

async function main() {
  const conn = await pool.getConnection();
  try {
    // TRUNCATE needs FK checks off (session-scoped, so use a dedicated connection).
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    await conn.query('TRUNCATE TABLE products');
    await conn.query('TRUNCATE TABLE categories');
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    await conn.beginTransaction();

    const categoryIdBySlug = new Map();
    for (const parent of categories) {
      const [res] = await conn.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [
        parent.name,
        parent.slug,
      ]);
      categoryIdBySlug.set(parent.slug, res.insertId);

      for (const childName of parent.children) {
        const childSlug = slugify(childName);
        const [childRes] = await conn.query(
          'INSERT INTO categories (parent_id, name, slug) VALUES (?, ?, ?)',
          [res.insertId, childName, childSlug],
        );
        categoryIdBySlug.set(childSlug, childRes.insertId);
      }
    }

    for (const p of products) {
      const categoryId = categoryIdBySlug.get(p.category);
      if (!categoryId) throw new Error(`Unknown category slug in seed data: ${p.category}`);

      await conn.query(
        `INSERT INTO products
           (title, slug, description, price, discount_price, category_id, brand,
            stock, ratings, review_count, images, status, attributes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.title,
          p.slug,
          p.description,
          p.price,
          p.discount_price,
          categoryId,
          p.brand,
          p.stock,
          p.ratings,
          p.review_count,
          JSON.stringify(p.images),
          p.stock === 0 ? 'out_of_stock' : 'active',
          JSON.stringify(p.attributes),
        ],
      );
    }

    await conn.commit();
    console.log(`Seeded ${categoryIdBySlug.size} categories and ${products.length} products`);
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
