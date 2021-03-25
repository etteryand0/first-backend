const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/products', productRoutes);


// Handle 404 error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status(404);
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;