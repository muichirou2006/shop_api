const env = require('../config/env');
const AppError = require('../utils/AppError');

function notFound(req, res, next) {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  let status = 500;
  let message = 'Internal server error';
  let details;

  if (err instanceof AppError) {
    ({ status, message, details } = err);
  } else if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Malformed JSON body';
  } else if (err.type === 'entity.too.large') {
    status = 413;
    message = 'Request body too large';
  } else if (err.code === 'ER_DUP_ENTRY') {
    status = 409;
    message = 'Resource already exists';
  } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    status = 400;
    message = 'Referenced resource does not exist';
  }

  if (status >= 500 && !env.isTest) console.error(err);

  const body = { error: { status, message } };
  if (details) body.error.details = details;
  if (status === 500 && !env.isProd) body.error.debug = err.message;
  return res.status(status).json(body);
}

module.exports = { notFound, errorHandler };
