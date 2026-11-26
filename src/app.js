const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

const origins = env.corsOrigin === '*' ? '*' : env.corsOrigin.split(',').map((o) => o.trim());

app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '100kb' }));
if (!env.isTest) app.use(morgan(env.isProd ? 'combined' : 'dev'));

// Product photos placed in shop_api/public/images are served at /images/<file>
app.use(
  '/images',
  express.static(path.join(__dirname, '..', 'public', 'images'), { maxAge: '7d' }),
);

app.use(
  '/api',
  rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: true, legacyHeaders: false }),
);

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
