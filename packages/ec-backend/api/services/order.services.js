/* eslint-disable no-underscore-dangle */
const query = require('../../utils/query');
const cartServices = require('./cart.services');

module.exports = {
  getDataFromUserCart: async (user) => {
    const populates = [
      {
        path: 'coupon',
      },
      {
        path: 'items.product',
        populate: {
          path: 'options',
          model: 'Variation',
        },
      },
    ];
    let cart = await query('Cart').findOne({ user: user.id }, populates);
    if (!cart) {
      cart = await query('Cart').create({
        user: user.id,
        items: [],
      });
    }

    cart = cartServices.formatCart(cart);
    return {
      items: cart.items.map((item) => ({
        name: item.product.name,
        image: item.product.images[0],
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.product.price,
        sku: item.product.sku,
        productId: item.product.sku,
      })),
      canOrder: cart.canOrder,
      totalAmount: cart.totalAmount,
      finalAmount: cart.finalAmount,
      id: cart.id,
    };
  },

  havePermissionToChangeStatus: (user, order, status) => {
    const { id: userId } = user;
    const { key: roleKey } = user.role;
    if (userId.toString() === order.user._id.toString() && status === 'CANCELED_BY_USER') {
      return true;
    }

    if ((roleKey === 'super_admin' || roleKey === 'sales_staff') && status !== 'CANCELED_BY_USER') {
      return true;
    }

    return false;
  },

  updateStockQuantity: async (type, items) => {
    let sign;
    switch (type) {
      case 'INCREASE':
        sign = 1;
        break;

      case 'DECREASE':
        sign = -1;
        break;

      default:
        throw new Error('Type must be one of INCREASE or DECREASE');
    }

    await Promise.all(items.map((item) => {
      const { size, quantity, productId } = item;
      return query('Variation').update({ product: productId, size }, { $inc: { remaining: sign * quantity } });
    }));
  },
};
