const crypto = require('crypto');
const axios = require('axios');
const query = require('../../utils/query');
const handleError = require('../../utils/handleErrorResponse');
const { MOMO } = require('../../configs/security');

module.exports = {
  momoPaymentSuccess: async (req, res) => {
    try {
      const { orderId, requestId } = req.query;
      const order = await query('Order').findById(orderId);
      if (!order) {
        return handleError.badRequest(
          res,
          'Order not found',
          'Order.not.found',
        );
      }

      if (order.momoRequestId !== requestId) {
        return handleError.badRequest(
          res,
          'RequestId invalid',
          'RequestId.invalid',
        );
      }

      await query('Order').updateById(orderId, {
        paid: true,
      });
      return res.redirect('http://localhost:3000');
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  momoPayment: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await query('Order').findById(orderId);

      if (!order) {
        return handleError.badRequest(
          res,
          'Order not found',
          'Order.not.found',
        )
      }

      if (order.paid) {
        return handleError.badRequest(
          res,
          'Order is paid',
          'Order.is.paid',
        )
      }

      if (order.paymentMethod !== 'MOMO') {
        return handleError.badRequest(
          res,
          'Payment method not Momo',
          'Payment.method.not.Momo',
        )
      }

      const partnerCode = MOMO.PARTNER_CODE;
      const accessKey = MOMO.ACCESS_KEY;
      const secretKey = MOMO.SECRET_KEY;
      const requestId = orderId + new Date().getTime();
      const orderInfo = `Purchase for order with ID ${orderId}`;
      const redirectUrl = 'http://localhost:8081/payment/momo/success';
      const ipnUrl = 'http://localhost:8081/payment/momo/success';
      const amount = order.finalAmount/100;
      const requestType = 'captureWallet';
      const extraData = '';

      // Before sign HMAC SHA256 with format
      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      // signature
      const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
      const requestBody = {
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en', 
      };
      const { data: result } = await axios({
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        data: requestBody,
      });
      await query('Order').updateById(orderId, { momoRequestId: requestId });
      return res.status(200).json({
        ...result,
      });
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};