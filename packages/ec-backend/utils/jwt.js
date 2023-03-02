const jwt = require('jsonwebtoken');
const { JWT_SECRET, EXPIRES_IN } = require('../configs/security');

module.exports = {
  getJWT: (req) => {
    const authorizationHeader = req.headers.authorization;
    return authorizationHeader ? authorizationHeader.split(' ')[1] : undefined;
  },

  verify: (token, callback) => jwt.verify(token, JWT_SECRET, callback),

  generate: (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN }),
};
