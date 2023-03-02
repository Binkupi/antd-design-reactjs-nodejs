const { nanoid } = require('nanoid');

const TOKEN_LENGTH = 128;

module.exports = {
  generateToken: () => nanoid(TOKEN_LENGTH),
};
