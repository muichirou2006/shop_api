-- Categories: two-level tree (parent -> subcategories) via parent_id.
CREATE TABLE IF NOT EXISTS categories (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  parent_id   INT UNSIGNED NULL,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(120) NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_categories_slug (slug),
  KEY idx_categories_parent (parent_id),
  CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id)
    REFERENCES categories (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Products: `attributes` is a JSON map for category-specific specs
-- (size, color, wattage, weight, ...), so no schema change is needed per category.
CREATE TABLE IF NOT EXISTS products (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title           VARCHAR(255) NOT NULL,
  slug            VARCHAR(280) NOT NULL,
  description     TEXT NOT NULL,
  price           DECIMAL(10,2) NOT NULL,
  discount_price  DECIMAL(10,2) NULL,
  category_id     INT UNSIGNED NOT NULL,
  brand           VARCHAR(100) NOT NULL DEFAULT '',
  stock           INT UNSIGNED NOT NULL DEFAULT 0,
  ratings         DECIMAL(2,1) NOT NULL DEFAULT 0.0,
  review_count    INT UNSIGNED NOT NULL DEFAULT 0,
  images          JSON NOT NULL,
  status          ENUM('active','out_of_stock') NOT NULL DEFAULT 'active',
  attributes      JSON NOT NULL,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_products_slug (slug),
  KEY idx_products_category (category_id),
  KEY idx_products_status (status),
  KEY idx_products_price (price),
  KEY idx_products_created (created_at),
  CONSTRAINT chk_products_price CHECK (price >= 0),
  CONSTRAINT chk_products_discount CHECK (discount_price IS NULL OR discount_price < price),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id)
    REFERENCES categories (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
