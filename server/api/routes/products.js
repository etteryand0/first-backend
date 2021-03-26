const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Product.find()
    .limit(20)
    .select("name price _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
            }
          }
        })
      }
      res.status(200).json(response);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err,
      })
    });
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        const response = {
          _id: doc._id,
          name: doc.name,
          price: doc.price,
        }
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'No products with such Id',
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: err});
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product.save()
    .then(result => {
      res.status(200).json({
        message: 'Created product successfully',
        product: {
          name: result.name,
          price: result.price,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + product._id
          }
        },
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  if (req.body[0]) {
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.findByIdAndUpdate({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Product updated",
          request: {
            type: "GET",
            request: "http://localhost:3000/products/" + result._id,
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  } else {
    res.status(422).json({
      error: "Please use this form [ { 'propName':'name', 'value':'newName' } ]",
    })
  }

})

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Deletion went successfully",
        deletedCount: result.deletedCount,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    })
})

module.exports = router;