const bcrypt = require('bcrypt');
const _ = require('lodash');
const { SALT_WORK_FACTOR } = require('../../configs/constants');

const PRIVATE_ATTRIBUTES = [
  'password',
  'confirmToken',
  'resetPwToken',
];

exports.PRIVATE_ATTRIBUTES = PRIVATE_ATTRIBUTES;

exports.initializeModel = (mongoose) => {
  const { Schema } = mongoose;
  const UserSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      birthday: {
        type: Date,
      },
      gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        default: 'MALE',
        required: true,
      },
      addressLine1: {
        type: String,
      },
      district: {
        type: String,
      },
      province: {
        type: String,
      },
      joinDate: {
        type: Date,
        required: true,
      },
      role: { type: Schema.Types.ObjectId, ref: 'Role' },
      isConfirmed: {
        type: Boolean,
        required: true,
        default: false,
      },
      confirmToken: String,
      resetPwToken: String,
      blocked: Boolean,
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  );

  // eslint-disable-next-line func-names
  UserSchema.pre('save', async function (next) {
    const user = this;
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    return next();
  });

  // eslint-disable-next-line func-names
  UserSchema.method('comparePassword', async function (candidatePassword) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (error) {
      return false;
    }
  });

  // eslint-disable-next-line func-names
  UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    PRIVATE_ATTRIBUTES.forEach((attribute) => {
      _.unset(object, attribute);
    });

    return object;
  });

  const User = mongoose.model('User', UserSchema);
  return User;
};
