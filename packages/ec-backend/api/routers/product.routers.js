const router = require('express').Router();
const {
  findProducts,
  findProductById,
  findProductBySlug,
  createProduct,
  updateProductById,
  searchProducts,
  countProducts,
  deleteProductById,
  findRelatedProduct,
} = require('../controllers/product.controllers');

router.get('/search', searchProducts);
router.get('/count', countProducts);
router.get('/slug/:slug', findProductBySlug);
router.get('/related/:id', findRelatedProduct);
router.delete('/:id', deleteProductById);
router.put('/:id', updateProductById);
router.get('/:id', findProductById);
router.get('/', findProducts);
router.post('/', createProduct);

module.exports = router;
