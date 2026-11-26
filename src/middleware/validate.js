const AppError = require('../utils/AppError');

/**
 * validate({ params, query, body }) - parses each part with a zod schema.
 * Parsed (coerced + defaulted) values are placed on req.valid.
 */
const validate = (schemas) => (req, res, next) => {
  const valid = {};
  const details = [];

  for (const part of ['params', 'query', 'body']) {
    if (!schemas[part]) continue;
    const result = schemas[part].safeParse(req[part]);
    if (result.success) {
      valid[part] = result.data;
    } else {
      for (const issue of result.error.issues) {
        details.push({ in: part, field: issue.path.join('.'), message: issue.message });
      }
    }
  }

  if (details.length > 0) return next(new AppError(400, 'Validation failed', details));
  req.valid = valid;
  return next();
};

module.exports = validate;
