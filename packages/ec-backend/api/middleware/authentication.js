const jwt = require('../../utils/jwt');
const { User } = require('../models');
const handleError = require('../../utils/handleErrorResponse');

module.exports = async (req, res, next) => {
  const token = jwt.getJWT(req);
  req.state = {};
  if (!token) {
    return next();
  }

  jwt.verify(token, async (error, payload) => {
    if (error) return handleError.unauthorized(res, 'Jwt invalid', 'Jwt.invalid');

    if (!payload.id) {
      return handleError.unauthorized(
        res,
        'Jwt not include required fields',
        'Jwt.not.include.required.fields',
      );
    }

    try {
      req.state.user = (await User.findOne({ id: payload.id }).populate('role')).toJSON();
      return next();
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  });
};
