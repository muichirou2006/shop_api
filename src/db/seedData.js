// Parent categories with their subcategories.
const categories = [
  { name: 'Electronics', slug: 'electronics', children: ['Smartphones', 'Laptops', 'Headphones'] },
  { name: 'Fashion', slug: 'fashion', children: ['T-Shirts', 'Shoes', 'Jackets'] },
  { name: 'Groceries', slug: 'groceries', children: ['Coffee & Tea', 'Snacks', 'Fresh Produce'] },
  { name: 'Furniture', slug: 'furniture', children: ['Sofas', 'Chairs', 'Tables'] },
  { name: 'Appliances', slug: 'appliances', children: ['Kitchen Appliances', 'Laundry'] },
  { name: 'Sports', slug: 'sports', children: ['Fitness', 'Outdoor'] },
];

const products = [
  {
    title: 'Nova X1 Smartphone 256GB',
    slug: 'nova-x1-smartphone-256gb',
    description:
      '6.1-inch OLED display, 50MP dual camera, all-day battery and 5G connectivity in a slim aluminium body.',
    price: 799.0,
    discount_price: 749.0,
    category: 'smartphones',
    brand: 'Nova',
    stock: 42,
    ratings: 4.6,
    review_count: 1280,
    images: [
      '/images/nova.jpg',
      '/images/nova-side.jpg',
    ],
    attributes: {
      storage: '256GB',
      ram: '8GB',
      screen_size: '6.1 in',
      battery_mah: 4500,
      color: ['Midnight Black', 'Silver'],
      five_g: true,
    },
  },
  {
    title: 'Classic Organic Cotton T-Shirt',
    slug: 'classic-organic-cotton-t-shirt',
    description:
      'A wardrobe essential in 100% organic cotton. Soft, breathable and cut for an easy everyday fit.',
    price: 24.99,
    discount_price: null,
    category: 't-shirts',
    brand: 'Everyday Co.',
    stock: 310,
    ratings: 4.4,
    review_count: 512,
    images: ['/images/shirt.jpg'],
    attributes: {
      size: ['S', 'M', 'L', 'XL'],
      color: ['Black', 'White', 'Navy'],
      material: '100% organic cotton',
      fit: 'Regular',
    },
  },
  {
    title: 'Highland Single-Origin Coffee Beans 1kg',
    slug: 'highland-single-origin-coffee-beans-1kg',
    description:
      'Freshly roasted Arabica beans with notes of dark chocolate and citrus. Roasted to order and shipped within 48 hours.',
    price: 18.5,
    discount_price: 15.99,
    category: 'coffee-tea',
    brand: 'Highland Roasters',
    stock: 120,
    ratings: 4.8,
    review_count: 934,
    images: ['/images/cafe.jpg'],
    attributes: {
      weight: '1kg',
      roast: 'Medium',
      origin: 'Ethiopia',
      organic: true,
      grind: ['Whole bean', 'Espresso', 'Filter'],
    },
  },
  {
    title: 'Oslo 3-Seater Linen Sofa',
    slug: 'oslo-3-seater-linen-sofa',
    description:
      'Scandinavian-style three-seater with solid oak legs, high-resilience foam cushions and removable linen-blend covers.',
    price: 899.0,
    discount_price: 799.0,
    category: 'sofas',
    brand: 'Nordhaus',
    stock: 8,
    ratings: 4.5,
    review_count: 143,
    images: [
      '/images/sofa.jpg',
      '/images/sofa-side.jpg',
    ],
    attributes: {
      material: 'Linen blend',
      seats: 3,
      color: ['Grey', 'Beige'],
      dimensions_cm: '210 x 90 x 85',
      weight_kg: 46,
    },
  },
  {
    title: 'AeroCrisp 5.5L Digital Air Fryer',
    slug: 'aerocrisp-5-5l-digital-air-fryer',
    description:
      'Cook crispy meals with up to 90% less oil. 8 presets, digital touch controls and a dishwasher-safe basket.',
    price: 129.99,
    discount_price: 99.99,
    category: 'kitchen-appliances',
    brand: 'AeroCrisp',
    stock: 0,
    ratings: 4.3,
    review_count: 676,
    images: ['/images/air-fryer.jpg'],
    attributes: {
      wattage: 1700,
      capacity_l: 5.5,
      color: ['Black'],
      presets: 8,
      warranty_years: 2,
    },
  },
  {
    "title": "Orbit S5 Smartphone 128GB",
    "slug": "orbit-s5-smartphone-128gb",
    "description": "6.5-inch AMOLED display, 64MP camera and a 5000mAh battery that lasts two days.",
    "price": 499.0,
    "discount_price": 449.0,
    "category": "smartphones",
    "brand": "Orbit",
    "stock": 60,
    "ratings": 4.3,
    "review_count": 860,
    "images": [
      "/images/smartPhone.jpg"
    ],
    "attributes": {
      "storage": "128GB",
      "ram": "6GB",
      "screen_size": "6.5 in",
      "battery_mah": 5000,
      "color": [
        "Ocean Blue",
        "Black"
      ]
    }
  },
  {
    "title": "Zenith Lite 5G Smartphone",
    "slug": "zenith-lite-5g-smartphone",
    "description": "Affordable 5G phone with a smooth 90Hz display and fast charging.",
    "price": 299.0,
    "discount_price": null,
    "category": "smartphones",
    "brand": "Zenith",
    "stock": 150,
    "ratings": 4.1,
    "review_count": 540,
    "images": [
      "/images/xiaomi.jpg"
    ],
    "attributes": {
      "storage": "128GB",
      "ram": "4GB",
      "screen_size": "6.4 in",
      "battery_mah": 4800,
      "color": [
        "Grey",
        "Silver"
      ],
      "five_g": true
    }
  },
  {
    "title": "AeroBook 14 Ultralight Laptop",
    "slug": "aerobook-14-ultralight-laptop",
    "description": "1.2kg aluminium laptop with a 14-inch 2.8K display and 16-hour battery life.",
    "price": 1099.0,
    "discount_price": 999.0,
    "category": "laptops",
    "brand": "AeroBook",
    "stock": 15,
    "ratings": 4.7,
    "review_count": 320,
    "images": [
      "/images/aerobook.jpg"
    ],
    "attributes": {
      "ram": "16GB",
      "storage": "512GB SSD",
      "screen_size": "14 in",
      "weight_kg": 1.2,
      "processor": "8-core",
      "color": [
        "Silver",
        "Space Grey"
      ]
    }
  },
  {
    "title": "ProStation 16 Creator Laptop",
    "slug": "prostation-16-creator-laptop",
    "description": "Colour-accurate 16-inch display and dedicated graphics for video and 3D work.",
    "price": 1799.0,
    "discount_price": null,
    "category": "laptops",
    "brand": "ProStation",
    "stock": 6,
    "ratings": 4.8,
    "review_count": 210,
    "images": [
      "/images/proStation.jpg"
    ],
    "attributes": {
      "ram": "32GB",
      "storage": "1TB SSD",
      "screen_size": "16 in",
      "weight_kg": 2.1,
      "processor": "12-core",
      "gpu": "Dedicated 8GB"
    }
  },
  {
    "title": "Student Go 15 Laptop",
    "slug": "student-go-15-laptop",
    "description": "Reliable everyday laptop for classes, browsing and documents.",
    "price": 549.0,
    "discount_price": 499.0,
    "category": "laptops",
    "brand": "StudyTech",
    "stock": 40,
    "ratings": 4.0,
    "review_count": 410,
    "images": [
      "/images/laptop.jpg"
    ],
    "attributes": {
      "ram": "8GB",
      "storage": "256GB SSD",
      "screen_size": "15.6 in",
      "weight_kg": 1.7,
      "color": [
        "Silver"
      ]
    }
  },
  {
    "title": "PulseBuds Wireless Earbuds",
    "slug": "pulsebuds-wireless-earbuds",
    "description": "True wireless earbuds with 24-hour battery life and a pocket-sized charging case.",
    "price": 59.99,
    "discount_price": 49.99,
    "category": "headphones",
    "brand": "Pulse",
    "stock": 200,
    "ratings": 4.4,
    "review_count": 1500,
    "images": [
      "/images/earbud.jpg"
    ],
    "attributes": {
      "battery_hours": 24,
      "color": [
        "White",
        "Black"
      ],
      "noise_cancelling": false,
      "water_resistant": "IPX4"
    }
  },
  {
    "title": "StudioMax Over-Ear Headphones",
    "slug": "studiomax-over-ear-headphones",
    "description": "Studio-tuned sound with plush ear cushions for all-day comfort.",
    "price": 199.0,
    "discount_price": null,
    "category": "headphones",
    "brand": "StudioMax",
    "stock": 0,
    "ratings": 4.6,
    "review_count": 380,
    "images": [
      "/images/headphone.jpg"
    ],
    "attributes": {
      "battery_hours": 40,
      "color": [
        "Black",
        "Brown"
      ],
      "noise_cancelling": true,
      "wired": true
    }
  },
  {
    "title": "Graphic Print Tee",
    "slug": "graphic-print-tee",
    "description": "Soft cotton tee with a bold front print and relaxed fit.",
    "price": 19.99,
    "discount_price": null,
    "category": "t-shirts",
    "brand": "Everyday Co.",
    "stock": 240,
    "ratings": 4.2,
    "review_count": 198,
    "images": [
      "/images/graphicprinttee.jpg"
    ],
    "attributes": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "color": [
        "White",
        "Black",
        "Olive"
      ],
      "material": "100% cotton"
    }
  },
  {
    "title": "Performance Dry-Fit Tee",
    "slug": "performance-dry-fit-tee",
    "description": "Moisture-wicking fabric that stays light and dry during workouts.",
    "price": 29.99,
    "discount_price": 24.99,
    "category": "t-shirts",
    "brand": "SprintLab",
    "stock": 180,
    "ratings": 4.5,
    "review_count": 342,
    "images": [
      "/images/dry-fit.jpg"
    ],
    "attributes": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "color": [
        "Black",
        "Navy",
        "Grey"
      ],
      "material": "Recycled polyester"
    }
  },
  {
    "title": "Urban Runner Sneakers",
    "slug": "urban-runner-sneakers",
    "description": "Responsive cushioning with a breathable knit upper for city commutes.",
    "price": 89.99,
    "discount_price": 79.99,
    "category": "shoes",
    "brand": "StrideWorks",
    "stock": 95,
    "ratings": 4.8,
    "review_count": 521,
    "images": [
      "/images/urban-runner.jpg"
    ],
    "attributes": {
      "size": [
        "US 7",
        "US 8",
        "US 9",
        "US 10",
        "US 11"
      ],
      "color": [
        "White",
        "Black",
        "Red"
      ],
      "material": "Knit mesh"
    }
  },
  {
    "title": "Leather Chelsea Boots",
    "slug": "leather-chelsea-boots",
    "description": "Full-grain leather boots with elastic side panels and a durable rubber sole.",
    "price": 129.0,
    "discount_price": null,
    "category": "shoes",
    "brand": "Hartley",
    "stock": 30,
    "ratings": 4.5,
    "review_count": 96,
    "images": [
      "/images/leather-chelsea.jpg"
    ],
    "attributes": {
      "size": [
        "US 7",
        "US 8",
        "US 9",
        "US 10",
        "US 11"
      ],
      "color": [
        "Brown",
        "Black"
      ],
      "material": "Full-grain leather"
    }
  },
  {
    "title": "Canvas Low-Top Sneakers",
    "slug": "canvas-low-top-sneakers",
    "description": "Classic canvas sneaker with a vulcanised sole.",
    "price": 49.0,
    "discount_price": null,
    "category": "shoes",
    "brand": "StrideWorks",
    "stock": 120,
    "ratings": 4.2,
    "review_count": 233,
    "images": [
      "/images/canvas-shoes.jpg"
    ],
    "attributes": {
      "size": [
        "US 7",
        "US 8",
        "US 9",
        "US 10",
        "US 11"
      ],
      "color": [
        "White",
        "Navy"
      ],
      "material": "Canvas"
    }
  },
  {
    "title": "Slim Fit Denim Jacket",
    "slug": "slim-fit-denim-jacket",
    "description": "Structured denim jacket with a modern slim silhouette.",
    "price": 79.0,
    "discount_price": null,
    "category": "jackets",
    "brand": "Hartley",
    "stock": 55,
    "ratings": 4.4,
    "review_count": 148,
    "images": [
      "/images/jacket.jpg"
    ],
    "attributes": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "color": [
        "Blue",
        "Black"
      ],
      "material": "Cotton denim"
    }
  },
  {
    "title": "Waterproof Rain Jacket",
    "slug": "waterproof-rain-jacket",
    "description": "Lightweight, packable shell with taped seams and an adjustable hood.",
    "price": 99.0,
    "discount_price": 84.0,
    "category": "jackets",
    "brand": "TrailEdge",
    "stock": 70,
    "ratings": 4.6,
    "review_count": 276,
    "images": [
      "/images/waterproof-jacket.jpg"
    ],
    "attributes": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "color": [
        "Yellow",
        "Navy",
        "Olive"
      ],
      "waterproof": true,
      "weight_g": 340
    }
  },
  {
    "title": "Quilted Winter Parka",
    "slug": "quilted-winter-parka",
    "description": "Warm recycled-fill parka rated for -15°C with a fur-free hood.",
    "price": 189.0,
    "discount_price": null,
    "category": "jackets",
    "brand": "NorthPeak",
    "stock": 12,
    "ratings": 4.7,
    "review_count": 89,
    "images": [
      "/images/winter-jacket.jpg"
    ],
    "attributes": {
      "size": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "color": [
        "Black",
        "Olive"
      ],
      "insulation": "Recycled down-alternative",
      "waterproof": true
    }
  },
  {
    "title": "Japanese Matcha Powder 100g",
    "slug": "japanese-matcha-powder-100g",
    "description": "Ceremonial-grade matcha stone-ground from shade-grown tea leaves.",
    "price": 24.5,
    "discount_price": null,
    "category": "coffee-tea",
    "brand": "Kyoto Leaf",
    "stock": 90,
    "ratings": 4.7,
    "review_count": 412,
    "images": [
      "/images/matcha.jpg"
    ],
    "attributes": {
      "weight": "100g",
      "origin": "Uji, Japan",
      "organic": true,
      "grade": "Ceremonial"
    }
  },
  {
    "title": "Earl Grey Tea Bags (50 pcs)",
    "slug": "earl-grey-tea-bags-50-pcs",
    "description": "Classic black tea scented with natural bergamot oil.",
    "price": 8.99,
    "discount_price": null,
    "category": "coffee-tea",
    "brand": "Brewmaster",
    "stock": 300,
    "ratings": 4.4,
    "review_count": 623,
    "images": [
      "/images/tea.jpg"
    ],
    "attributes": {
      "weight": "100g",
      "count": 50,
      "caffeine": "Medium",
      "organic": false
    }
  },
  {
    "title": "Roasted Almonds 500g",
    "slug": "roasted-almonds-500g",
    "description": "Dry-roasted, lightly salted California almonds.",
    "price": 11.99,
    "discount_price": 9.99,
    "category": "snacks",
    "brand": "NutHouse",
    "stock": 210,
    "ratings": 4.5,
    "review_count": 330,
    "images": [
      "/images/roasted.jpg"
    ],
    "attributes": {
      "weight": "500g",
      "salted": true,
      "vegan": true
    }
  },
  {
    "title": "Dark Chocolate Bar 85% (3-pack)",
    "slug": "dark-chocolate-bar-85-3-pack",
    "description": "Smooth, intense dark chocolate made with fair-trade cocoa.",
    "price": 7.49,
    "discount_price": null,
    "category": "snacks",
    "brand": "Cacao & Co",
    "stock": 160,
    "ratings": 4.6,
    "review_count": 287,
    "images": [
      "/images/dark-chocolate.jpg"
    ],
    "attributes": {
      "weight": "3 x 80g",
      "cocoa": "85%",
      "vegan": true,
      "fair_trade": true
    }
  },
  {
    "title": "Organic Hass Avocados (4 pcs)",
    "slug": "organic-hass-avocados-4-pcs",
    "description": "Creamy, ripe-and-ready organic avocados.",
    "price": 6.99,
    "discount_price": null,
    "category": "fresh-produce",
    "brand": "Green Valley",
    "stock": 80,
    "ratings": 4.3,
    "review_count": 152,
    "images": [
      "/images/avocados.jpg"
    ],
    "attributes": {
      "weight": "4 pcs",
      "organic": true,
      "origin": "Mexico",
      "storage": "Room temperature"
    }
  },
  {
    "title": "Fresh Strawberries 500g",
    "slug": "fresh-strawberries-500g",
    "description": "Sweet, juicy strawberries picked at peak ripeness.",
    "price": 4.99,
    "discount_price": 3.99,
    "category": "fresh-produce",
    "brand": "Berry Farm",
    "stock": 0,
    "ratings": 4.5,
    "review_count": 201,
    "images": [
      "/images/strawberries.jpg"
    ],
    "attributes": {
      "weight": "500g",
      "organic": false,
      "origin": "Local farm",
      "storage": "Refrigerate"
    }
  },
  {
    "title": "Corner Sectional Sofa",
    "slug": "corner-sectional-sofa",
    "description": "L-shaped sectional with reversible chaise and deep, supportive seating.",
    "price": 1299.0,
    "discount_price": 1149.0,
    "category": "sofas",
    "brand": "Nordhaus",
    "stock": 5,
    "ratings": 4.6,
    "review_count": 64,
    "images": [
      "/images/corner-sofa.jpg"
    ],
    "attributes": {
      "material": "Woven fabric",
      "seats": 5,
      "color": [
        "Charcoal",
        "Cream"
      ],
      "dimensions_cm": "280 x 180 x 85"
    }
  },
  {
    "title": "Ergonomic Office Chair",
    "slug": "ergonomic-office-chair",
    "description": "Breathable mesh back, adjustable lumbar support and 4D armrests.",
    "price": 249.0,
    "discount_price": 219.0,
    "category": "chairs",
    "brand": "ErgoPro",
    "stock": 35,
    "ratings": 4.6,
    "review_count": 512,
    "images": [
      "/images/chair-office.jpg"
    ],
    "attributes": {
      "material": "Mesh",
      "color": [
        "Black",
        "Grey"
      ],
      "max_load_kg": 130,
      "adjustable_height": true
    }
  },
  {
    "title": "Solid Oak Dining Chair",
    "slug": "solid-oak-dining-chair",
    "description": "Hand-finished solid oak chair with a curved, comfortable back.",
    "price": 89.0,
    "discount_price": null,
    "category": "chairs",
    "brand": "Nordhaus",
    "stock": 48,
    "ratings": 4.4,
    "review_count": 97,
    "images": [
      "/images/dining-chair.jpg"
    ],
    "attributes": {
      "material": "Solid oak",
      "color": [
        "Natural",
        "Walnut"
      ],
      "seat_height_cm": 46
    }
  },
  {
    "title": "Extendable Dining Table",
    "slug": "extendable-dining-table",
    "description": "Seats 4 to 8 with a smooth butterfly extension.",
    "price": 449.0,
    "discount_price": null,
    "category": "tables",
    "brand": "Nordhaus",
    "stock": 10,
    "ratings": 4.5,
    "review_count": 73,
    "images": [
      "/images/dining-table.jpg"
    ],
    "attributes": {
      "material": "Oak veneer",
      "seats": "4-8",
      "dimensions_cm": "160-220 x 90 x 75",
      "color": [
        "Natural",
        "Dark Oak"
      ]
    }
  },
  {
    "title": "Walnut Coffee Table",
    "slug": "walnut-coffee-table",
    "description": "Round walnut coffee table with a lower storage shelf.",
    "price": 159.0,
    "discount_price": 139.0,
    "category": "tables",
    "brand": "Hartley Home",
    "stock": 22,
    "ratings": 4.3,
    "review_count": 58,
    "images": [
      "/images/coffee-table.jpg"
    ],
    "attributes": {
      "material": "Walnut veneer",
      "dimensions_cm": "90 x 90 x 40",
      "color": [
        "Walnut"
      ]
    }
  },
  {
    "title": "Smart Espresso Machine",
    "slug": "smart-espresso-machine",
    "description": "15-bar pump, built-in grinder and a steam wand for café-style drinks.",
    "price": 329.0,
    "discount_price": 289.0,
    "category": "kitchen-appliances",
    "brand": "BrewTech",
    "stock": 18,
    "ratings": 4.6,
    "review_count": 244,
    "images": [
      "/images/smart-machine.jpg"
    ],
    "attributes": {
      "wattage": 1450,
      "capacity_l": 1.8,
      "color": [
        "Black",
        "Steel"
      ],
      "pressure_bar": 15
    }
  },
  {
    "title": "High-Speed Blender 1.8L",
    "slug": "high-speed-blender-1-8l",
    "description": "1200W blender for smoothies, soups and nut butters.",
    "price": 89.99,
    "discount_price": null,
    "category": "kitchen-appliances",
    "brand": "BlendPro",
    "stock": 64,
    "ratings": 4.4,
    "review_count": 389,
    "images": [
      "/images/blender.jpg"
    ],
    "attributes": {
      "wattage": 1200,
      "capacity_l": 1.8,
      "color": [
        "Black",
        "Red"
      ],
      "dishwasher_safe": true
    }
  },
  {
    "title": "Front-Load Washer 9kg",
    "slug": "front-load-washer-9kg",
    "description": "Energy-efficient washer with 16 programs and steam refresh.",
    "price": 649.0,
    "discount_price": 599.0,
    "category": "laundry",
    "brand": "CleanWave",
    "stock": 5,
    "ratings": 4.5,
    "review_count": 132,
    "images": [
      "/images/washer.jpg"
    ],
    "attributes": {
      "capacity_kg": 9,
      "spin_rpm": 1400,
      "energy_class": "A",
      "color": [
        "White"
      ],
      "wattage": 2100
    }
  },
  {
    "title": "Non-Slip Yoga Mat 6mm",
    "slug": "non-slip-yoga-mat-6mm",
    "description": "Extra-cushioned, non-slip mat with alignment lines.",
    "price": 29.99,
    "discount_price": null,
    "category": "fitness",
    "brand": "ZenFlow",
    "stock": 140,
    "ratings": 4.6,
    "review_count": 718,
    "images": [
      "/images/yoga-mat.jpg"
    ],
    "attributes": {
      "thickness_mm": 6,
      "color": [
        "Purple",
        "Teal",
        "Black"
      ],
      "material": "TPE",
      "length_cm": 183
    }
  },
  {
    "title": "Adjustable Dumbbell Set 20kg",
    "slug": "adjustable-dumbbell-set-20kg",
    "description": "Quick-adjust dumbbells replacing 8 pairs of weights.",
    "price": 139.0,
    "discount_price": 119.0,
    "category": "fitness",
    "brand": "IronCore",
    "stock": 26,
    "ratings": 4.7,
    "review_count": 305,
    "images": [
      "/images/dumbbell.jpg"
    ],
    "attributes": {
      "weight_kg": 20,
      "color": [
        "Black"
      ],
      "adjustment_steps": 8
    }
  },
  {
    "title": "4-Person Camping Tent",
    "slug": "4-person-camping-tent",
    "description": "Two-door dome tent with a rainfly and quick-pitch poles.",
    "price": 119.0,
    "discount_price": 99.0,
    "category": "outdoor",
    "brand": "TrailEdge",
    "stock": 20,
    "ratings": 4.4,
    "review_count": 167,
    "images": [
      "/images/camping.jpg"
    ],
    "attributes": {
      "capacity": "4 persons",
      "weight_kg": 4.8,
      "color": [
        "Green",
        "Orange"
      ],
      "waterproof": true
    }
  },
  {
    "title": "Insulated Water Bottle 1L",
    "slug": "insulated-water-bottle-1l",
    "description": "Double-wall stainless steel bottle: cold 24h, hot 12h.",
    "price": 24.99,
    "discount_price": null,
    "category": "outdoor",
    "brand": "HydroKeep",
    "stock": 250,
    "ratings": 4.8,
    "review_count": 1042,
    "images": [
      "/images/water-bottle.jpg"
    ],
    "attributes": {
      "capacity_l": 1,
      "color": [
        "Black",
        "Blue",
        "Sage"
      ],
      "material": "Stainless steel",
      "bpa_free": true
    }
  },
  {
    "title": "Trekking Backpack 45L",
    "slug": "trekking-backpack-45l",
    "description": "Ventilated back panel, rain cover and padded hip belt.",
    "price": 109.0,
    "discount_price": 94.0,
    "category": "outdoor",
    "brand": "TrailEdge",
    "stock": 33,
    "ratings": 4.5,
    "review_count": 214,
    "images": [
      "/images/backpack.jpg"
    ],
    "attributes": {
      "capacity_l": 45,
      "color": [
        "Grey",
        "Blue"
      ],
      "weight_kg": 1.6,
      "rain_cover": true
    }
  },
];

module.exports = { categories, products };