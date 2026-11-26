const { z } = require('zod');

const attributeValue = z.union([
  z.string().max(200),
  z.number(),
  z.boolean(),
  z.array(z.union([z.string().max(100), z.number()])).max(50),
]);

const idParams = z.object({
  id: z.coerce.number().int().positive(),
});

const listQuery = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    q: z.string().trim().min(1).max(100).optional(),
    category: z.string().trim().toLowerCase().min(1).max(120).optional(),
    min_price: z.coerce.number().min(0).optional(),
    max_price: z.coerce.number().min(0).optional(),
    sort: z.enum(['price_asc', 'price_desc', 'newest']).default('newest'),
  })
  .refine(
    (d) => d.min_price === undefined || d.max_price === undefined || d.min_price <= d.max_price,
    { message: 'min_price must be less than or equal to max_price', path: ['min_price'] },
  );

const createBody = z
  .object({
    title: z.string().trim().min(2).max(255),
    description: z.string().trim().min(1).max(10000),
    price: z.number().positive().max(99999999.99),
    discount_price: z.number().positive().max(99999999.99).nullable().optional(),
    category_id: z.number().int().positive(),
    brand: z.string().trim().max(100).default(''),
    stock: z.number().int().min(0).max(1000000).default(0),
    images: z
      .array(
        z
          .string()
          .max(2048)
          .refine((v) => /^https?:\/\/\S+$/.test(v) || /^\/images\/[\w.\-]+$/.test(v), {
            message: 'must be an http(s) URL or a path like /images/photo.jpg',
          }),
      )
      .max(10)
      .default([]),
    status: z.enum(['active', 'out_of_stock']).optional(),
    attributes: z.record(z.string().min(1).max(50), attributeValue).default({}),
  })
  .strict() // reject unknown fields (e.g. ratings, review_count are server-managed)
  .refine((d) => d.discount_price == null || d.discount_price < d.price, {
    message: 'discount_price must be lower than price',
    path: ['discount_price'],
  });

module.exports = { idParams, listQuery, createBody };
