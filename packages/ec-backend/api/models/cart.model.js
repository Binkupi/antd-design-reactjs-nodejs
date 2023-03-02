/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;

const PRIVATE_ATTRIBUTES = [];

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const CartSchema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      }],
      coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  );

  // eslint-disable-next-line func-names
  CartSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (_.isArray(object.items)) {
      object.items = object.items.map((item) => {
        if (ObjectId.isValid(item)) {
          return item;
        }

        item.id = item._id;
        return _.omit(item, ['__v', '_id']);
      });
    }

    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const Cart = mongoose.model('Cart', CartSchema);
  return Cart;
};
