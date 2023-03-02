/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const userModel = require('./user.model');

const PRIVATE_ATTRIBUTES = [];

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const OrderSchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      receiverName: {
        type: String,
        required: true,
      },
      receiverPhone: {
        type: String,
        required: true,
      },
      receiverEmail: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
      orderDate: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      payDate: {
        type: Date,
      },
      paymentMethod: {
        type: String,
        enum: ['COD', 'MOMO'],
        default: 'COD',
        required: true,
      },
      paid: {
        type: Boolean,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      finalAmount: {
        type: Number,
        required: true,
      },
      items: [{
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
        sku: {
          type: String,
          required: true,
        },
        productId: {
          type: String,
          required: true,
        },
      }],
      status: {
        type: String,
        enum: ['NEW', 'CONFIRMED', 'DELIVERING', 'SUCCESS', 'CANCELED_BY_USER', 'CANCELED_BY_SHOP'],
        default: 'COD',
        required: true,
      },
      coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
      momoRequestId: String,
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  );

  // eslint-disable-next-line func-names
  OrderSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (!ObjectId.isValid(object.user)) {
      object.user.id = object.user._id;
      object.user = _.omit(object.user, ['_id', '__v', ...userModel.PRIVATE_ATTRIBUTES]);

      if (!ObjectId.isValid(object.user.role)) {
        object.user.role.id = object.user.role._id;
        object.user.role = _.omit(object.user.role, ['_id', '__v']);
      }
    }

    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const Order = mongoose.model('Order', OrderSchema);
  return Order;
};
