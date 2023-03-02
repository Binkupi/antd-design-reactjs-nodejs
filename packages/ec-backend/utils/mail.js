const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const { APP_EMAIL, APP_EMAIL_PASSWORD } = require('../configs/constants');
const { DOMAIN } = require('../configs/server');
const logger = require('./logger');

const CONFIRMATION_EMAIL_TEMPLATE = path.join(
  __dirname,
  '../templates/confirmationEmail.template.ejs',
);
const RESET_PW_EMAIL_TEMPLATE = path.join(
  __dirname,
  '../templates/resetPasswordEmail.template.ejs',
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: APP_EMAIL,
    pass: APP_EMAIL_PASSWORD,
  },
});

module.exports = {
  sendMail: (receiverEmail, subject, text, html) => {

  },

  sendMails: (receiverEmails, subject, text, html) => {

  },

  sendEmailConfirmation: (user) => {
    const { email, confirmToken } = user;
    const params = {
      websiteName: '2PQFashion Shop',
      websiteURL: DOMAIN,
      confirmToken,
    };
    ejs.renderFile(CONFIRMATION_EMAIL_TEMPLATE, params, {}, (error, htmlContent) => {
      if (error) {
        logger.error(error);
      }

      const mailOptions = {
        from: APP_EMAIL,
        to: email,
        subject: `[${params.websiteName}] Confirm your email`,
        html: htmlContent,
      };
      return transporter.sendMail(mailOptions);
    });
  },

  sendResetPasswordEmail: (user) => {
    const { email, resetPwToken } = user;
    const params = {
      websiteName: '2PQFashion Shop',
      websiteURL: 'http://localhost:3000',
      resetPwToken,
    };
    ejs.renderFile(RESET_PW_EMAIL_TEMPLATE, params, {}, (error, htmlContent) => {
      if (error) {
        logger.error(error);
      }

      const mailOptions = {
        from: APP_EMAIL,
        to: email,
        subject: `[${params.websiteName}] Change your password`,
        html: htmlContent,
      };
      return transporter.sendMail(mailOptions);
    });
  },
};
