const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const newsRoutes = require('./routes/news');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());
app.use(limiter);

app.use('/news', newsRoutes);

app.use('*', (req, res) => {
  res.status(404).send('The resource can not be found');
});

module.exports = app;
