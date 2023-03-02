/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;

const PRIVATE_ATTRIBUTES = [];

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const ProductSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rating: {
        grade: Number,
        votes: Number,
      },
      shortDesc: {
        type: String,
        required: true,
      },
      options: [{ type: Schema.Types.ObjectId, ref: 'Variation' }],
      sku: {
        type: String,
        unique: true,
        index: true,
      },
      category: String,
      tags: Array,
      fullDesc: {
        type: String,
        required: true,
      },
      additionalInfo: {
        type: String,
        required: true,
      },
      images: Array,
      status: Number,
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  );

  // eslint-disable-next-line func-names
  ProductSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (_.isArray(object.options)) {
      object.options = object.options.map((option) => {
        if (ObjectId.isValid(option)) {
          return option;
        }

        option.id = option._id;
        return _.omit(option, ['__v', '_id']);
      });
    }

    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const Product = mongoose.model('Product', ProductSchema);
  return Product;
};
