const _ = require('lodash');

const PRIVATE_ATTRIBUTES = [];

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const PermissionSchema = new Schema({
    roleKey: {
      type: String,
      require: true,
    },
    method: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    isExactly: {
      type: Boolean,
      require: true,
    },
  });

  // eslint-disable-next-line func-names
  PermissionSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const Permission = mongoose.model('Permission', PermissionSchema);
  return Permission;
};
