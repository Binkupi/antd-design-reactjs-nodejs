const router = require('express').Router();
const {
  postProductToPage
} = require('../controllers/facebook.controllers');

router.get('/post-product/:productId', postProductToPage);

module.exports = router;
