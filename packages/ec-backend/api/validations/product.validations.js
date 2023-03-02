const Joi = require('joi').extend(require('joi-file-extensions'));
const _ = require('lodash');

module.exports = {
  createSchema: (params) => {
    const schema = Joi.object({
      name: Joi.string().max(128).required(),
      slug: Joi.string().max(128).required(),
      price: Joi.number().integer().min(0).required(),
      category: Joi.string().min(1).max(100).required(),
      shortDesc: Joi.string().max(1024).required(),
      options: Joi.alternatives().try(
        Joi.array().items(Joi.object({
          size: Joi.string().valid('S', 'M', 'L', 'XL'),
          quantity: Joi.number().min(0),
          remaining: Joi.number().min(0),
        })),
        Joi.string().custom((value, helper) => {
          const optionsArray = JSON.parse(value);
          if (!_.isArray(optionsArray)) {
            // eslint-disable-next-line no-useless-escape
            return helper.message('\"options\" must be an array or an string can convert to array');
          }

          const { error } = Joi.array().items(
            Joi.object({
              size: Joi.string().valid('S', 'M', 'L', 'XL'),
              quantity: Joi.number().min(0),
              remaining: Joi.number().min(0),
            }),
          ).validate(optionsArray);

          if (error) {
            // eslint-disable-next-line no-useless-escape
            return helper.message(`Element ${error.message} in \"options\"`);
          }

          return optionsArray;
        }),
      ).required(),
      sku: Joi.string().max(128).required(),
      tags: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string().custom((value, helper) => {
          const convertResult = JSON.parse(value);
          if (_.isArray(convertResult)) {
            return convertResult;
          }

          // eslint-disable-next-line no-useless-escape
          return helper.message('\"tags\" must be an array or an string can convert to array');
        }),
      ).required(),
      fullDesc: Joi.string().required(),
      additionalInfo: Joi.string().required(),
      'files.images': Joi.file().contents(),
      images: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string().custom((value, helper) => {
          const convertResult = JSON.parse(value);
          if (_.isArray(convertResult)) {
            return convertResult;
          }

          // eslint-disable-next-line no-useless-escape
          return helper.message('\"tags\" must be an array or an string can convert to array');
        }),
      ),
      status: Joi.number().min(0).max(3).required(),
      rating: Joi.number().min(1).max(5).required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },

  updateSchema: (params) => {
    const schema = Joi.object({
      name: Joi.string().max(128),
      slug: Joi.string().max(128),
      price: Joi.number().integer().min(0),
      category: Joi.string().min(1).max(100),
      quantity: Joi.number().integer().min(0),
      shortDesc: Joi.string().max(300),
      options: Joi.alternatives().try(
        Joi.array().items(Joi.object({
          _id: Joi.string(),
          size: Joi.string().valid('S', 'M', 'L', 'XL'),
          quantity: Joi.number().min(0),
          remaining: Joi.number().min(0),
        })),
        Joi.string().custom((value, helper) => {
          const optionsArray = JSON.parse(value);
          if (!_.isArray(optionsArray)) {
            // eslint-disable-next-line no-useless-escape
            return helper.message('\"options\" must be an array or an string can convert to array');
          }

          const { error } = Joi.array().items(
            Joi.object({
              _id: Joi.string(),
              size: Joi.string().valid('S', 'M', 'L', 'XL'),
              quantity: Joi.number().min(0),
              remaining: Joi.number().min(0),
            }),
          ).validate(optionsArray);

          if (error) {
            // eslint-disable-next-line no-useless-escape
            return helper.message(`Element ${error.message} in \"options\"`);
          }

          return optionsArray;
        }),
      ),
      sku: Joi.string(),
      tags: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string().custom((value, helper) => {
          const convertResult = JSON.parse(value);
          if (_.isArray(convertResult)) {
            return convertResult;
          }

          // eslint-disable-next-line no-useless-escape
          return helper.message('\"tags\" must be an array or an string can convert to array');
        }),
      ),
      fullDesc: Joi.string(),
      additionalInfo: Joi.string(),
      'files.images': Joi.file().contents(),
      images: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string().custom((value, helper) => {
          const convertResult = JSON.parse(value);
          if (_.isArray(convertResult)) {
            return convertResult;
          }

          // eslint-disable-next-line no-useless-escape
          return helper.message('\"tags\" must be an array or an string can convert to array');
        }),
      ),
      status: Joi.number().min(0).max(3),
      rating: Joi.number().min(1).max(5),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },
};
