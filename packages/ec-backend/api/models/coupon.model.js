const _ = require('lodash');

const PRIVATE_ATTRIBUTES = [];

exports.PRIVATE_ATTRIBUTES = PRIVATE_ATTRIBUTES;

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const CouponSchema = new Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
      },
      expiresDate: {
        type: Date,
        required: true,
      },
      type: {
        type: String,
        enum: ['PERCENT', 'CASH'],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      condition: {
        type: String,
        enum: ['LTE', 'GTE', 'NONE'],
        required: true,
      },
      orderValue: {
        type: Number,
      },
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  );

  // eslint-disable-next-line func-names
  CouponSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const Coupon = mongoose.model('Coupon', CouponSchema);
  return Coupon;
};
