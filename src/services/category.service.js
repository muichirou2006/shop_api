const { pool } = require('../config/db');

/** Returns parent categories, each with a `children` array of subcategories. */
async function getCategoryTree() {
  const [rows] = await pool.query(
    'SELECT id, parent_id, name, slug FROM categories ORDER BY name ASC',
  );

  const nodes = new Map(
    rows.map((r) => [r.id, { id: r.id, name: r.name, slug: r.slug, children: [] }]),
  );
  const roots = [];

  for (const row of rows) {
    const node = nodes.get(row.id);
    const parent = row.parent_id ? nodes.get(row.parent_id) : null;
    if (parent) parent.children.push(node);
    else roots.push(node);
  }
  return roots;
}

async function categoryExists(id) {
  const [rows] = await pool.query('SELECT id FROM categories WHERE id = ? LIMIT 1', [id]);
  return rows.length > 0;
}

module.exports = { getCategoryTree, categoryExists };
