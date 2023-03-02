const _ = require('lodash');

const PRIVATE_ATTRIBUTES = [];

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const CategorySchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        unique: true,
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
  CategorySchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const Category = mongoose.model('Category', CategorySchema);
  return Category;
};
