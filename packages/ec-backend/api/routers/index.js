const userRouter = require('./user.routers');
const productRouter = require('./product.routers');
const tagRouter = require('./tag.routers');
const categoryRouter = require('./category.routers');
const orderRouter = require('./order.routers');
const couponRouter = require('./coupon.routers');
const roleRouter = require('./role.routers');
const paymentRouter = require('./payment.routers');
const facebookRouter = require('./facebook.routers');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/products', productRouter);
  app.use('/tags', tagRouter);
  app.use('/categories', categoryRouter);
  app.use('/orders', orderRouter);
  app.use('/coupons', couponRouter);
  app.use('/roles', roleRouter);
  app.use('/payment', paymentRouter);
  app.use('/facebook', facebookRouter);
};
