const router = require('express').Router();
const {
  findCoupons,
  findCouponById,
  createCoupon,
  updateCouponById,
  countCoupons,
  deleteCouponById,
} = require('../controllers/coupon.controllers');

router.get('/count', countCoupons);
router.delete('/:id', deleteCouponById);
router.put('/:id', updateCouponById);
router.get('/:id', findCouponById);
router.get('/', findCoupons);
router.post('/', createCoupon);

module.exports = router;
