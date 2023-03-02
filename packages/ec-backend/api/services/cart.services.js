/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const query = require('../../utils/query');

module.exports = {
  formatCart: (cart) => {
    const formattedCart = cart.toJSON();
    formattedCart.canOrder = true;

    formattedCart.totalAmount = 0;
    formattedCart.items = cart.items.map((item) => {
      const formattedItem = item.toJSON();
      // Re-calculate total price of the cart
      formattedCart.totalAmount += formattedItem.product.price * formattedItem.quantity;
      // Check remaining numbers of the item
      const { remaining } = formattedItem.product.options.find(
        (option) => option.size === formattedItem.size,
      );
      formattedItem.remaining = remaining;
      formattedItem.isAvailable = true;
      if (remaining < formattedItem.quantity) {
        formattedCart.canOrder = false;
        formattedItem.isAvailable = false;
      }

      return formattedItem;
    });
    if (formattedCart.items.length === 0) {
      formattedCart.canOrder = false;
    }

    formattedCart.finalAmount = formattedCart.totalAmount;
    const { coupon } = formattedCart;
    if (coupon) {
      const today = new Date();
      let satisfyCondition;
      if (coupon.condition === 'GTE') {
        satisfyCondition = formattedCart.totalAmount >= coupon.orderValue;
      }

      if (coupon.condition === 'LTE') {
        satisfyCondition = formattedCart.totalAmount <= coupon.orderValue;
      }

      if (coupon.condition === 'NONE') {
        satisfyCondition = true;
      }

      if (today < coupon.expiresDate && satisfyCondition) {
        switch (coupon.type) {
          case 'PERCENT':
            formattedCart.finalAmount *= (1 - coupon.value / 100);
            formattedCart.finalAmount = _.toInteger(formattedCart.finalAmount);
            break;

          case 'CASH':
            formattedCart.finalAmount -= coupon.value;
            if (formattedCart.finalAmount < 0) {
              formattedCart.finalAmount = 0;
            }

            formattedCart.finalAmount = _.toInteger(formattedCart.finalAmount);
            break;

          default:
            break;
        }
      } else {
        if (today >= coupon.expiresDate) {
          formattedCart.invalidCoupon = 'EXPIRES';
        }

        if (!satisfyCondition) {
          formattedCart.invalidCoupon = 'CONDITION';
        }
      }
    }

    return formattedCart;
  },

  addItemToCart: async (cart, item) => {
    const existed = cart.items.find(
      (cartItem) =>
        item.product === cartItem.product._id.toString()
        && item.size === cartItem.size,
    );
    if (existed) {
      existed.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }

    await cart.save();
    return cart;
  },

  removeItemFromCart: async (cart, itemId) => {
    cart.items = cart.items.filter(
      (cartItem) => cartItem._id.toString() !== itemId,
    );

    await cart.save();
    return cart;
  },

  changeItemQuantity: async (cart, itemId, quantity) => {
    if (!_.isInteger(quantity) || quantity < 1) {
      throw new Error('Quantity must be a number and greater than 0');
    }

    const item = cart.items.find(({ _id: id }) => id.toString() === itemId);
    const product = await query('Product').findById(item.product.toString(), 'options');
    const option = product.options.find(({ size }) => size === item.size);
    if (quantity > option.remaining) {
      throw new Error('Quantity is over remaining of product');
    }

    item.quantity = quantity;
    await cart.save();
    return cart;
  },

  changeItemSize: async (cart, itemId, size) => {
    cart.items.forEach((item) => {
      if (item._id.toString() === itemId) {
        item.size = size;
      }
    });
    await cart.save();
    return cart;
  },
};
