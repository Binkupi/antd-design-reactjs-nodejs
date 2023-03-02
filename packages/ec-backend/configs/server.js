require('dotenv').config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8081;

module.exports = {
  HOST,
  PORT,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DOMAIN: process.env.DOMAIN || `http://${HOST}:${PORT}`,
};
