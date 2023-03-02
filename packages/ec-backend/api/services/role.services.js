const { Role } = require('../models');
const validate = require('../validations/role.validations');

module.exports = {
  createRole: async (name, description, key) => {
    const { error } = validate.createSchema({ name, description, key });
    if (error) {
      throw error;
    }

    const role = new Role({ name, description, key });
    await role.save();
    return role;
  },
};
