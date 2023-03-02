const { Permission } = require('../models');
const handleError = require('../../utils/handleErrorResponse');

module.exports = async (req, res, next) => {
  const { baseUrl, path, method } = req;
  const { user } = req.state;
  const roleKey = user ? user.role.key : 'public';
  const permissions = await Permission.find({
    method: { $in: ['*', method] },
    roleKey,
    path: { $regex: `^${baseUrl}` },
  });

  const isPermissionEnabled = permissions.some((permission) => {
    if (permission.isExactly) {
      return permission.path === (baseUrl + path);
    }

    return (baseUrl + path).indexOf(permission.path) !== -1;
  });

  if (isPermissionEnabled) {
    return next();
  }

  return handleError.forbidden(
    res,
    'Forbidden',
    'Forbidden',
  );
};
