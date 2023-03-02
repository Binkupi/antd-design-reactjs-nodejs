require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.APP_JWT_SECRET || '123456789abc',
  EXPIRES_IN: process.env.EXPIRES_IN || '30d',
  MOMO: {
    PARTNER_CODE: process.env.PARTNER_CODE || '',
    ACCESS_KEY: process.env.ACCESS_KEY || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
  },
  FACEBOOK: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || '',
  }
};
