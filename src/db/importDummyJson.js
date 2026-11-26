
const { pool } = require('../config/db');
const { slugify } = require('../utils/helpers');

const SOURCE_URL = process.env.DUMMYJSON_URL || 'https://dummyjson.com/products?limit=0';

const CATEGORY_MAP = {
  smartphones: ['Electronics', 'Smartphones'],
  laptops: ['Electronics', 'Laptops'],
  tablets: ['Electronics', 'Tablets'],
  'mobile-accessories': ['Electronics', 'Mobile Accessories'],
  'mens-shirts': ['Fashion', "Men's Shirts"],
  'mens-shoes': ['Fashion', "Men's Shoes"],
  'womens-dresses': ['Fashion', 'Dresses'],
  'womens-shoes': ['Fashion', "Women's Shoes"],
  'womens-bags': ['Fashion', 'Bags'],
  'womens-jewellery': ['Fashion', 'Jewellery'],
  tops: ['Fashion', 'Tops'],
  sunglasses: ['Fashion', 'Sunglasses'],
  'mens-watches': ['Fashion', "Men's Watches"],
  'womens-watches': ['Fashion', "Women's Watches"],
  beauty: ['Beauty', 'Makeup'],
  'skin-care': ['Beauty', 'Skin Care'],
  fragrances: ['Beauty', 'Fragrances'],
  furniture: ['Furniture', 'Home Furniture'],
  'home-decoration': ['Furniture', 'Home Decor'],
  'kitchen-accessories': ['Furniture', 'Kitchen & Dining'],
  groceries: ['Groceries', 'Fresh & Pantry'],
  'sports-accessories': ['Sports', 'Sports Accessories'],
  motorcycle: ['Vehicles', 'Motorcycles'],
  vehicle: ['Vehicles', 'Cars'],
};

const titleCase = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const round2 = (n) => Math.round(n * 100) / 100;

function mapCategory(source) {
  return CATEGORY_MAP[source] || ['More', titleCase(source || 'other')];
}

async function loadProducts() {
  let res;
  try {
    res = await fetch(SOURCE_URL);
  } catch (err) {
    throw new Error(
      `Could not reach ${SOURCE_URL}. Check your internet connection. (${err.cause?.code || err.message})`,
    );
  }
  if (!res.ok) throw new Error(`Source returned HTTP ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json.products)) throw new Error('Unexpected response: no "products" array');
  return json.products;
}

function toRow(p) {
  const price = Number(p.price);
  const pct = Number(p.discountPercentage) || 0;
  let discount = round2(price * (1 - pct / 100));
  if (pct < 1 || discount >= price || discount <= 0) discount = null;

  const images = (Array.isArray(p.images) && p.images.length ? p.images : [p.thumbnail]).filter(Boolean);
  const stock = Math.max(0, Math.trunc(Number(p.stock) || 0));

  const attributes = {};
  if (p.sku) attributes.sku = p.sku;
  if (p.weight != null) attributes.weight = p.weight;
  if (p.dimensions) {
    attributes.dimensions = `${p.dimensions.width} x ${p.dimensions.height} x ${p.dimensions.depth}`;
  }
  if (p.warrantyInformation) attributes.warranty = p.warrantyInformation;
  if (p.shippingInformation) attributes.shipping = p.shippingInformation;
  if (p.returnPolicy) attributes.return_policy = p.returnPolicy;
  if (p.minimumOrderQuantity) attributes.minimum_order = p.minimumOrderQuantity;
  if (Array.isArray(p.tags) && p.tags.length) attributes.tags = p.tags;

  return {
    title: String(p.title).slice(0, 255),
    slug: `${slugify(p.title) || 'product'}-${p.id}`.slice(0, 270),
    description: p.description || p.title,
    price,
    discount_price: discount,
    brand: String(p.brand || '').slice(0, 100),
    stock,
    ratings: Math.min(5, Math.round((Number(p.rating) || 0) * 10) / 10),
    review_count: Array.isArray(p.reviews) ? p.reviews.length : 0,
    images,
    status: stock === 0 ? 'out_of_stock' : 'active',
    attributes,
    sourceCategory: p.category,
  };
}

async function main() {
  console.log(`Downloading products from ${SOURCE_URL} ...`);
  const rows = (await loadProducts()).map(toRow);
  console.log(`Downloaded ${rows.length} products`);

  const conn = await pool.getConnection();
  try {
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');
    await conn.query('TRUNCATE TABLE products');
    await conn.query('TRUNCATE TABLE categories');
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    await conn.beginTransaction();

    const parentIds = new Map(); // parent slug -> id
    const childIds = new Map(); // child slug -> id

    for (const row of rows) {
      const [parentName, childName] = mapCategory(row.sourceCategory);
      const parentSlug = slugify(parentName);
      const childSlug = slugify(childName);

      if (!parentIds.has(parentSlug)) {
        const [r] = await conn.query('INSERT INTO categories (name, slug) VALUES (?, ?)', [
          parentName,
          parentSlug,
        ]);
        parentIds.set(parentSlug, r.insertId);
      }
      if (!childIds.has(childSlug)) {
        const [r] = await conn.query(
          'INSERT INTO categories (parent_id, name, slug) VALUES (?, ?, ?)',
          [parentIds.get(parentSlug), childName, childSlug],
        );
        childIds.set(childSlug, r.insertId);
      }

      await conn.query(
        `INSERT INTO products
           (title, slug, description, price, discount_price, category_id, brand,
            stock, ratings, review_count, images, status, attributes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row.title,
          row.slug,
          row.description,
          row.price,
          row.discount_price,
          childIds.get(childSlug),
          row.brand,
          row.stock,
          row.ratings,
          row.review_count,
          JSON.stringify(row.images),
          row.status,
          JSON.stringify(row.attributes),
        ],
      );
    }

    await conn.commit();
    console.log(
      `Imported ${rows.length} products in ${parentIds.size} categories (${childIds.size} subcategories)`,
    );
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Import failed:', err.message);
  process.exit(1);
});