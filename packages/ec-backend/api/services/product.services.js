/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const query = require('../../utils/query');

module.exports = {
  createProduct: async (data, files = []) => {
    const params = data;
    params.rating = {
      grade: 0,
      votes: 0,
    };
    params.tags = _.isArray(params.tags)
      ? params.tags
      : JSON.parse(params.tags);

    params.images = _.isArray(params.images)
      ? params.images
      : JSON.parse(params.images);
    params.images = params.images.concat(
      files.map((file) => `/uploads/images/${file.filename}`),
    );

    params.options = _.isArray(params.options)
      ? params.options
      : JSON.parse(params.options);
    const variations = await Promise.all(params.options.map((option) => query('Variation').create(option)));
    params.options = variations.map(({ _id }) => _id);

    const product = await query('Product').create(params);
    return product;
  },

  updateProductById: async (id, data, files = []) => {
    const params = data;
    const populates = [
      {
        path: 'options',
        model: 'Variation',
      },
    ];
    if (params.tags) {
      params.tags = _.isArray(params.tags)
        ? params.tags
        : JSON.parse(params.tags);
    }

    if (params.images) {
      params.images = _.isArray(params.images)
        ? params.images
        : JSON.parse(params.images);
      params.images = params.images.concat(
        files.map((file) => `/uploads/images/${file.filename}`),
      );
    } else if (files.length > 0) {
      params.images = files.map((file) => `/uploads/images/${file.filename}`);
    }

    if (params.options) {
      params.options = _.isArray(params.options)
        ? params.options
        : JSON.parse(params.options);

      const variations = await Promise.all(
        params.options.map((option) => {
          if (!option._id) {
            return query('Variation').create(option);
          }

          const { _id, ...updateContent } = option;
          return _.isEmpty(updateContent)
            ? option
            : query('Variation').updateById(_id, updateContent);
        }),
      );

      params.options = variations.map(({ _id }) => _id);
    }

    const product = await query('Product').updateById(id, params, populates);
    return product;
  },
};
