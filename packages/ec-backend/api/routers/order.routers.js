const router = require('express').Router();
const {
  createOrder,
  findOrders,
  findOrderById,
  updateStatusOrder,
  countNewOrders,
  countOrderInCurrentDay,
  countOrderInCurrentMonth,
  getProfitInCurrentMonth,
  countOrdersByMonth,
  getProfitByMonth
} = require('../controllers/order.controllers');

router.get('/stat/profit-by-month', getProfitByMonth);
router.get('/stat/profit-current-month', getProfitInCurrentMonth);
router.get('/count/by-month', countOrdersByMonth);
router.get('/count/current-month', countOrderInCurrentMonth);
router.get('/count/current-day', countOrderInCurrentDay);
router.get('/count/new-orders', countNewOrders);
router.put('/update-status', updateStatusOrder);
router.get('/:id', findOrderById);
router.get('/', findOrders);
router.post('/', createOrder);

module.exports = router;
