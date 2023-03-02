const router = require('express').Router();
const {
  momoPaymentSuccess,
  momoPayment
} = require('../controllers/payment.controllers');

router.get('/momo/success', momoPaymentSuccess);
router.get('/momo/:orderId', momoPayment);

module.exports = router;