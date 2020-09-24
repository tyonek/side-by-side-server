const express = require('express');
const ProductsService = require('./products-service');
const { requireAuth } = require('../middleware/jwt-auth');
const productsRouter = express.Router();
const jsonBodyParser = express.json();

productsRouter
  .route('/')
  .get((req, res, next) => {
    ProductsService.getAllProducts(req.app.get('db'))
      .then(products => {
        res.json(products.map(ProductsService.serializeProduct));
      })
      .catch(next);
  });

productsRouter
  .route('/:product_id')
  .all(requireAuth)
  .all(checkProductExists)
  .get((req, res) => {
    res.json(ProductsService.serializeProduct(res.product));
  });

productsRouter.route('/:product_id/comments/')
  .all(requireAuth)
  .all(checkProductExists)
  .get((req, res, next) => {
    ProductsService.getCommentsForProduct(
      req.app.get('db'),
      req.params.product_id
    )
      .then(comments => {
        res.json(comments.map(ProductsService.serializeproductComment));
      })
      .catch(next);
  });

  productsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title, price, description, link } = req.body;
    const newProduct = { title, price, description,link };

    for (const [key, value] of Object.entries(newProduct))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newProduct.author_id = req.user.id;


    ProductsService.insertProduct(
      req.app.get('db'),
      newProduct
    )
      .then(product => {
        res
          .status(201)
          .json(ProductsService.serializeProduct(product));
      })
      .catch(next);
    });

/* async/await syntax for promises */
async function checkProductExists(req, res, next) {
  try {
    const product = await ProductsService.getById(
      req.app.get('db'),
      req.params.product_id
    )

    if (!product)
      return res.status(404).json({
        error: `product doesn't exist`
      });

    res.product = product;
    next()
  } catch (error) {
    next(error)
  };
};

module.exports = productsRouter;