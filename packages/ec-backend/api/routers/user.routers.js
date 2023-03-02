const router = require('express').Router();
const {
  signUp,
  signIn,
  me,
  confirmEmail,
  resendEmailConfirmation,
  forgetPassword,
  resetPassword,
  changePassword,
  findUsers,
  findUserById,
  updateUserById,
} = require('../controllers/user.controllers');
const {
  getMyCart,
  addItemToCart,
  removeItemFromCart,
  getItemNumbers,
  changeItemQuantity,
  changeItemSize,
  applyCoupon,
  removeCoupon,
} = require('../controllers/cart.controllers');
const {
  findOrdersByUser,
} = require('../controllers/order.controllers');

// Sign in & Sign up
router.post('/auth/local', signIn);
router.post('/auth/local/register', signUp);

// Confirm email
router.post('/auth/send-email-confirmation', resendEmailConfirmation);
router.get('/auth/email-confirmation', confirmEmail);

// Forget password
router.post('/auth/forget-password', forgetPassword);
router.post('/auth/reset-password', resetPassword);

// User cart
router.post('/me/cart/add-item', addItemToCart);
router.post('/me/cart/remove-item', removeItemFromCart);
router.get('/me/cart/item-numbers', getItemNumbers);
router.post('/me/cart/change-item-quantity', changeItemQuantity);
router.post('/me/cart/change-item-size', changeItemSize);
router.post('/me/cart/apply-coupon', applyCoupon);
router.get('/me/cart/remove-coupon', removeCoupon);
router.get('/me/cart', getMyCart);

router.get('/me/orders', findOrdersByUser);

// Profile and update profile
router.post('/auth/change-password', changePassword);
router.get('/me', me);

// Admin page
router.put('/:id', updateUserById);
router.get('/:id', findUserById);
router.get('/', findUsers);

module.exports = router;
