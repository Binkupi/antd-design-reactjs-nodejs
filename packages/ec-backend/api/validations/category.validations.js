const Joi = require('joi');

module.exports = {
  createSchema: (params) => {
    const schema = Joi.object({
      name: Joi.string().max(128).required(),
      description: Joi.string().required(),
      slug: Joi.string().max(128).required(),
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
