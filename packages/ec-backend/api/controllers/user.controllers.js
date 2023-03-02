const { User, Role } = require('../models');
const handleError = require('../../utils/handleErrorResponse');
const { sendEmailConfirmation, sendResetPasswordEmail } = require('../../utils/mail');
const validate = require('../validations/user.validations');
const jwt = require('../../utils/jwt');
const nanoid = require('../../utils/nanoid');
const query = require('../../utils/query');

const MODEL_NAME = 'User';

module.exports = {
  findUsers: async (req, res) => {
    try {
      const queryParams = req.query;
      const populates = [
        {
          path: 'role',
          model: 'Role',
        },
      ];
      const page = await query(MODEL_NAME).findPage(queryParams, populates);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await query('User').findById(id, 'role');
      if (!user) {
        return handleError.notFound(
          res,
          'User not found',
          'User.not.found',
        );
      }

      return res.status(200).json(user);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  signIn: async (req, res) => {
    try {
      const { error } = validate.signInSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const params = req.body;
      // Check if user exists
      const user = await User.findOne({ email: params.email }).populate('role');
      if (!user) {
        return handleError.unauthorized(
          res,
          'Email not registered',
          'Email.not.registered',
        );
      }

      // Check the password is correct
      if (!(await user.comparePassword(params.password))) {
        return handleError.unauthorized(
          res,
          'Password wrongs',
          'Password.wrongs',
        );
      }

      // Check if email confirmed
      if (user.blocked) {
        return handleError.forbidden(
          res,
          'You are blocked',
          'You.are.blocked',
        );
      }

      // Check if email confirmed
      if (!user.isConfirmed) {
        return handleError.forbidden(
          res,
          'Email not confirmed',
          'Email.not.confirmed',
        );
      }

      return res.status(200).json({
        user,
        jwt: jwt.generate({
          id: user.id,
        }),
      });
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  signUp: async (req, res) => {
    try {
      const { error } = validate.signUpSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const params = req.body;
      params.addresses = [];
      params.joinDate = new Date();
      params.role = undefined;
      params.isConfirmed = false;
      params.confirmToken = nanoid.generateToken();
      params.resetPwToken = nanoid.generateToken();
      // Check if email is already used
      const user = await User.findOne({ email: params.email });
      if (user) {
        return handleError.badRequest(
          res,
          'Email is already used',
          'Email.is.already.used',
        );
      }

      const userRole = await Role.findOne({ key: 'user' });
      if (!userRole) {
        throw new Error('User role is not exist');
      }

      // eslint-disable-next-line no-underscore-dangle
      params.role = userRole._id;
      const newUser = await User.create(params);
      sendEmailConfirmation(newUser);
      return res.status(201).json(newUser);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  me: async (req, res) => {
    const { user } = req.state;
    if (!user) {
      return handleError.unauthorized(res, 'Unauthorized', 'Unauthorized');
    }

    return res.status(200).json(user);
  },

  forgetPassword: async (req, res) => {
    try {
      const { error } = validate.forgetPasswordSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const params = req.body;
      // Check if user exists
      const user = await User.findOne({ email: params.email });
      if (!user) {
        return handleError.badRequest(
          res,
          'Email not registered',
          'Email.not.registered',
        );
      }

      sendResetPasswordEmail(user);
      return res.status(200).json(true);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { error } = validate.resetPasswordSchema(req.body);
      console.log(error);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const params = req.body;
      const user = await User.findOne({ resetPwToken: params.code });

      if (!user) {
        return handleError.badRequest(
          res,
          'Token invalid',
          'Token.invalid',
        );
      }

      user.password = params.newPassword;
      await user.save();
      return res.status(200).json({
        user,
        jwt: jwt.generate({ id: user.id }),
      });
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { error } = validate.changePasswordSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const params = req.body;
      if (!req.state.user.id) {
        return handleError.unauthorized(res, 'Unauthorized', 'Unauthorized');
      }

      const user = await User.findOne({ id: req.state.user.id });
      if (!(await user.comparePassword(params.currentPassword))) {
        return handleError.badRequest(
          res,
          'Current password wrongs',
          'Current.password.wrongs',
        );
      }

      user.password = params.newPassword;
      await user.save();
      return res.status(200).json(true);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  confirmEmail: async (req, res) => {
    try {
      const { token } = req.query;
      if (!token) {
        return handleError.badRequest(
          res,
          'Token required',
          'Token.required',
        );
      }

      // Check if user exists
      const user = await User.findOne({ confirmToken: token });
      if (!user) {
        return handleError.badRequest(
          res,
          'Token invalid',
          'Token.invalid',
        );
      }

      user.confirmToken = undefined;
      user.isConfirmed = true;
      await user.save();
      return res.status(200).json(true);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  resendEmailConfirmation: async (req, res) => {
    try {
      const { error } = validate.resendEmailConfirmationSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const params = req.body;
      // Check if user exists
      const user = await User.findOne({ email: params.email });
      if (!user) {
        return handleError.badRequest(
          res,
          'Email not registered',
          'Email.not.registered',
        );
      }

      sendEmailConfirmation(user);
      return res.status(200).json(true);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  updateUserById: async (req, res) => {
    try {
      const { error } = validate.updateSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const { id } = req.params;
      let user = await query('User').updateById(id, req.body);
      if (!user) {
        return handleError.notFound(
          res,
          'User not found',
          'User.not.found',
        );
      }

      user = await query('User').findById(id, 'role');
      return res.status(200).json(user);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
