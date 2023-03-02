const Joi = require('joi');

module.exports = {
  createSchema: (params) => {
    const schema = Joi.object({
      receiverName: Joi.string().required(),
      receiverEmail: Joi.string().email({ tlds: { allow: false } }),
      receiverPhone: Joi.string().length(10).regex(/^\d+$/).required(),
      address: Joi.string().required(),
      notes: Joi.string(),
      paymentMethod: Joi.string().valid('COD', 'MOMO').required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },

  updateStatusSchema: (params) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      status: Joi
        .string()
        .valid('NEW', 'CONFIRMED', 'DELIVERING', 'SUCCESS', 'CANCELED_BY_USER', 'CANCELED_BY_SHOP')
        .required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },
};
