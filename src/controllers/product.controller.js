const asyncHandler = require('../utils/asyncHandler');
const productService = require('../services/product.service');

// Image paths stored like "/images/phone.jpg" are turned into full URLs using the
// address the client used to reach the API (works for emulator, simulator and phones).
const baseUrlOf = (req) => `${req.protocol}://${req.get('host')}`;

const withAbsoluteImages = (product, baseUrl) => ({
  ...product,
  images: product.images.map((url) => (url.startsWith('/') ? `${baseUrl}${url}` : url)),
});

exports.list = asyncHandler(async (req, res) => {
  const { data, meta } = await productService.listProducts(req.valid.query);
  const baseUrl = baseUrlOf(req);
  res.json({ data: data.map((p) => withAbsoluteImages(p, baseUrl)), meta });
});

exports.getOne = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.valid.params.id);
  res.json({ data: withAbsoluteImages(product, baseUrlOf(req)) });
});

exports.create = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.valid.body);
  res
    .status(201)
    .location(`/api/v1/products/${product.id}`)
    .json({ data: withAbsoluteImages(product, baseUrlOf(req)) });
});
