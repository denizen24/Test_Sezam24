// npm install --max-old-space-size=100
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const newsRoutes = require('./routes/news');

const PORT = process.env.PORT || 3000;

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

app.get('*', (req, res) => {
  res.status(404).send('The resource can not be found');
});

// app.listen(PORT); //for testing

module.exports = app;
