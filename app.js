const express = require('express');
const fetch = require('node-fetch');

const newsRoutes = require('./routes/news');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', newsRoutes);

app.get('*', (req, res) => {
  res.status(404).send('The resource can not be found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
