const _ = require('lodash');

const PRIVATE_ATTRIBUTES = [];

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const RoleSchema = new Schema({
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    key: {
      type: String,
      require: true,
      unique: true,
    },
  });

  // eslint-disable-next-line func-names
  RoleSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const Role = mongoose.model('Role', RoleSchema);
  return Role;
};
