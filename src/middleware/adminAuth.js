const crypto = require('crypto');
const env = require('../config/env');
const AppError = require('../utils/AppError');

/**
 * Minimal admin guard using a shared secret in the `x-api-key` header.
 * Replace with JWT + role checks once you add user accounts.
 */
function requireAdmin(req, res, next) {
  if (!env.adminApiKey) {
    return next(new AppError(503, 'Admin API is not configured on this server'));
  }
  const provided = Buffer.from(req.get('x-api-key') || '');
  const expected = Buffer.from(env.adminApiKey);
  const ok = provided.length === expected.length && crypto.timingSafeEqual(provided, expected);
  if (!ok) return next(new AppError(401, 'Invalid or missing API key'));
  return next();
}

module.exports = requireAdmin;
