const Joi = require('joi');

module.exports = {
  createSchema: (params) => {
    const schema = Joi.object({
      name: Joi.string().max(128).required(),
      description: Joi.string().max(256).required(),
      key: Joi.string().max(128).required(),
    });

    const { error } = schema.validate(params);
    if (error) {
      return { error, valid: false };
    }

    return { error: null, valid: true };
  },
};
