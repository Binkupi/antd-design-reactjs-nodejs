const Joi = require('joi');
const _ = require('lodash');

module.exports = {
  createSchema: (params) => {
    const schema = Joi.object({
      user: Joi.string().required(),
      coupon: Joi.string(),
      items: Joi.alternatives().try(
        Joi.array().items(Joi.object({
          item: Joi.string().required(),
          quantity: Joi.number().min(1).required(),
        })),
        Joi.string().custom((value, helper) => {
          const itemsArray = JSON.parse(value);
          if (!_.isArray(itemsArray)) {
            // eslint-disable-next-line no-useless-escape
            return helper.message('\"items\" must be an array or an string can convert to array');
          }

          const { error } = Joi.array().items(
            Joi.object({
              item: Joi.string().required(),
              quantity: Joi.number().min(1).required(),
            }),
          ).validate(itemsArray);

          if (error) {
            // eslint-disable-next-line no-useless-escape
            return helper.message(`Element ${error.message} in \"items\"`);
          }

          return itemsArray;
        }),
      ),
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
      description: Joi.string(),
      slug: Joi.string().max(128),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },
};
