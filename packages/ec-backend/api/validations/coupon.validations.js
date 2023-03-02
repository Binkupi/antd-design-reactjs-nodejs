const Joi = require('joi');

module.exports = {
  createSchema: (params) => {
    const schema = Joi.object({
      code: Joi.string().max(64).required(),
      expiresDate: Joi.date().required(),
      type: Joi.string().valid('PERCENT', 'CASH').required(),
      value: Joi.when('type', {
        is: Joi.string().valid('PERCENT'),
        then: Joi.number().min(1).max(99).required(),
        otherwise: Joi.number().min(1).required(),
      }),
      condition: Joi.string().valid('LTE', 'GTE', 'NONE').required(),
      orderValue: Joi.when('condition', {
        is: Joi.string().valid('LTE', 'GTE'),
        then: Joi.number().required(),
        otherwise: Joi.disallow(),
      }),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },

  updateSchema: (params) => {
    const schema = Joi.object({
      code: Joi.string().max(64),
      expiresDate: Joi.date(),
      type: Joi.string().valid('PERCENT', 'CASH'),
      value: Joi.when('type', {
        is: Joi.string().valid('PERCENT'),
        then: Joi.number().min(1).max(99).required(),
        otherwise: Joi.when('type', {
          is: Joi.string().valid('CASH'),
          then: Joi.number().min(1).required(),
          otherwise: Joi.disallow(),
        }),
      }),
      condition: Joi.string().valid('LTE', 'GTE', 'NONE'),
      orderValue: Joi.when('condition', {
        is: Joi.string().valid('LTE', 'GTE'),
        then: Joi.number().required(),
        otherwise: Joi.disallow(),
      }),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },
};
