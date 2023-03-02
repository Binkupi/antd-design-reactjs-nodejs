const _ = require('lodash');

const PRIVATE_ATTRIBUTES = [];

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const VariationSchema = new Schema(
    {
      size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL'],
        required: true,
      },
      remaining: {
        type: Number,
        required: true,
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
  VariationSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const Variation = mongoose.model('Variation', VariationSchema);
  return Variation;
};
