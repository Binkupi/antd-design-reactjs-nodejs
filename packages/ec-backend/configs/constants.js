require('dotenv').config();

module.exports = {
  SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR || 10,
  APP_EMAIL: process.env.APP_EMAIL,
  APP_EMAIL_PASSWORD: process.env.APP_EMAIL_PASSWORD,
};
