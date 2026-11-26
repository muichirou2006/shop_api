const asyncHandler = require('../utils/asyncHandler');
const categoryService = require('../services/category.service');

exports.list = asyncHandler(async (req, res) => {
  const data = await categoryService.getCategoryTree();
  res.json({ data });
});
