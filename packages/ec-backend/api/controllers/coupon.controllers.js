const query = require('../../utils/query');
const handleError = require('../../utils/handleErrorResponse');
const validate = require('../validations/coupon.validations');

const COUPON_MODEL_NAME = 'Coupon';

module.exports = {
  createCoupon: async (req, res) => {
    try {
      const { error } = validate.createSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const coupon = await query(COUPON_MODEL_NAME).create(req.body);
      return res.status(201).json(coupon);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findCoupons: async (req, res) => {
    try {
      const queryParams = req.query;
      const page = await query(COUPON_MODEL_NAME).findPage(queryParams);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findCouponById: async (req, res) => {
    try {
      const { id } = req.params;
      const coupon = await query(COUPON_MODEL_NAME).findById(id);
      if (!coupon) {
        return handleError.notFound(
          res,
          'Coupon not found',
          'Coupon.not.found',
        );
      }

      return res.status(200).json(coupon);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  deleteCouponById: async (req, res) => {
    try {
      const { id } = req.params;
      const coupon = await query(COUPON_MODEL_NAME).deleteById(id);
      if (!coupon) {
        return handleError.notFound(
          res,
          'Coupon not found',
          'Coupon.not.found',
        );
      }

      return res.status(200).json(true);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  updateCouponById: async (req, res) => {
    try {
      const { error } = validate.updateSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const { id } = req.params;
      const coupon = await query(COUPON_MODEL_NAME).updateById(id, req.body);
      return res.status(200).json(coupon);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  countCoupons: async (req, res) => {
    try {
      const queryParams = req.query;
      const count = await query(COUPON_MODEL_NAME).count(queryParams);
      return res.status(200).json(count);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
