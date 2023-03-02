/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
const validate = require('../validations/order.validations');
const handleError = require('../../utils/handleErrorResponse');
const query = require('../../utils/query');
const orderServices = require('../services/order.services');
const { getISODateBeforeNowByDays } = require('../../utils/date');
const { Order } = require('../models');

const ORDER_MODEL_NAME = 'Order';
const populates = [
  {
    path: 'user',
    populate: {
      path: 'role',
      model: 'Role',
    },
  },
];

module.exports = {
  createOrder: async (req, res) => {
    try {
      const { error } = validate.createSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const { user } = req.state;
      const params = req.body;
      const {
        totalAmount,
        finalAmount,
        items,
        canOrder,
        id: cartId,
      } = await orderServices.getDataFromUserCart(user);
      if (!canOrder) {
        return handleError.badRequest(
          res,
          'Your cart could not order',
          'Your.cart.could.not.order',
        );
      }

      const order = await query(ORDER_MODEL_NAME)
        .create({
          user: user.id,
          ...params,
          items,
          totalAmount,
          finalAmount,
          orderDate: new Date(),
          paid: false,
          status: 'NEW',
        }, populates);
      await orderServices.updateStockQuantity('DECREASE', items);
      await query('Cart').deleteById(cartId);
      return res.status(200).json(order);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findOrdersByUser: async (req, res) => {
    try {
      const { user } = req.state;
      const queryParams = req.query;
      queryParams.user = user.id;
      if (queryParams.orderDate) {
        queryParams.orderDate = {
          $gte: `${queryParams.orderDate}T00:00:00`,
          $lte: `${queryParams.orderDate}T23:59:59`,
        };
      }

      if (!queryParams.orderDate) {
        if (queryParams.orderDate_gte) {
          queryParams.orderDate = {
            $gte: `${queryParams.orderDate_gte}T00:00:00`,
          };
          delete queryParams.orderDate_gte;
        }

        if (queryParams.orderDate_lte) {
          queryParams.orderDate = {
            ...queryParams.orderDate,
            $lte: `${queryParams.orderDate_lte}T23:59:59`,
          };
          delete queryParams.orderDate_lte;
        }

        if (queryParams.orderDate_gt) {
          queryParams.orderDate = {
            ...queryParams.orderDate,
            $gt: `${queryParams.orderDate_gt}T23:59:59`,
          };
          delete queryParams.orderDate_gt;
        }

        if (queryParams.orderDate_lt) {
          queryParams.orderDate = {
            ...queryParams.orderDate,
            $lt: `${queryParams.orderDate_lt}T00:00:00`,
          };
          delete queryParams.orderDate_lt;
        }
      }

      const orders = await query(ORDER_MODEL_NAME).findPage(queryParams);
      return res.status(200).json(orders);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findOrders: async (req, res) => {
    try {
      const queryParams = req.query;
      if (queryParams.orderDate) {
        queryParams.orderDate = {
          $gte: `${queryParams.orderDate}T00:00:00`,
          $lte: `${queryParams.orderDate}T23:59:59`,
        };
      }

      if (!queryParams.orderDate) {
        if (queryParams.orderDate_gte) {
          queryParams.orderDate = {
            $gte: `${queryParams.orderDate_gte}T00:00:00`,
          };
          delete queryParams.orderDate_gte;
        }

        if (queryParams.orderDate_lte) {
          queryParams.orderDate = {
            ...queryParams.orderDate,
            $lte: `${queryParams.orderDate_lte}T23:59:59`,
          };
          delete queryParams.orderDate_lte;
        }

        if (queryParams.orderDate_gt) {
          queryParams.orderDate = {
            ...queryParams.orderDate,
            $gt: `${queryParams.orderDate_gt}T23:59:59`,
          };
          delete queryParams.orderDate_gt;
        }

        if (queryParams.orderDate_lt) {
          queryParams.orderDate = {
            ...queryParams.orderDate,
            $lt: `${queryParams.orderDate_lt}T00:00:00`,
          };
          delete queryParams.orderDate_lt;
        }
      }

      const page = await query(ORDER_MODEL_NAME).findPage(queryParams);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await query(ORDER_MODEL_NAME).findById(id);
      if (!order) {
        return handleError.notFound(
          res,
          'Order not found',
          'Order.not.found',
        );
      }

      return res.status(200).json(order);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  updateStatusOrder: async (req, res) => {
    try {
      const { error } = validate.updateStatusSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const { id, status } = req.body;
      const { user } = req.state;
      const order = await query(ORDER_MODEL_NAME).findById(id, populates);
      if (!order) {
        return handleError.notFound(
          res,
          'Order not found',
          'Order.not.found',
        );
      }

      const havePermission = orderServices.havePermissionToChangeStatus(user, order, status);
      if (!havePermission) {
        return handleError.forbidden(
          res,
          'You do not have permission',
          'You.do.not.have.permission',
        );
      }

      order.status = status;
      await order.save();

      if (status === 'CANCELED_BY_USER' || status === 'CANCELED_BY_SHOP') {
        await orderServices.updateStockQuantity('INCREASE', order.items);
      }

      return res.status(200).json(order);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  countNewOrders: async (req, res) => {
    try {
      const count = await query('Order').count({ status: 'NEW' });
      return res.status(200).json(count);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  countOrderInCurrentDay: async (req, res) => {
    try {
      const today = getISODateBeforeNowByDays(0).split('T')[0];
      const count = await query('Order').count({
        created_at: {
          $gte: `${today}T00:00:00`,
          $lte: `${today}T23:59:59`,
        },
      });
      return res.status(200).json(count);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  countOrderInCurrentMonth: async (req, res) => {
    try {
      const firstDayOfCurrentMonth = new Date(new Date().setDate(1));
      const firstDayOfNextMonth = new Date(new Date().setDate(1));
      firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1);
      const count = await query('Order').count({
        created_at: {
          $gte: `${firstDayOfCurrentMonth.toISOString().split('T')[0]}T00:00:00`,
          $lt: `${firstDayOfNextMonth.toISOString().split('T')[0]}T00:00:00`,
        },
      });
      return res.status(200).json(count);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  getProfitInCurrentMonth: async (req, res) => {
    try {
      const firstDayOfCurrentMonth = new Date(new Date().setDate(1));
      const firstDayOfNextMonth = new Date(new Date().setDate(1));
      firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1);
      const orders = await query('Order').find({
        created_at: {
          $gte: `${firstDayOfCurrentMonth.toISOString().split('T')[0]}T00:00:00`,
          $lt: `${firstDayOfNextMonth.toISOString().split('T')[0]}T00:00:00`,
        },
        status: 'SUCCESS',
      });
      let totalProfit = 0;
      orders.map((order) => totalProfit += order.finalAmount);
      return res.status(200).json(totalProfit);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  countOrdersByMonth: async (req, res) => {
    try {
      const today = new Date();
      today.setDate(1);
      today.setMonth(0);
      const currentYear = new Date(today).toISOString().split('T')[0];
      today.setFullYear(today.getFullYear() + 1);
      const nextYear = new Date(today).toISOString().split('T')[0];
      const data = await Order.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $gte: ['$created_at', new Date(`${currentYear}T00:00:00`)] },
                { $lt: ['$created_at', new Date(`${nextYear}T00:00:00`)] },
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: '$created_at' },
              year: { $year: '$created_at' },
            },
            orders: {
              $sum: 1,
            },
          },
        },
        { $sort: { month: 1 } },
        {
          $project: {
            Date: {
              $concat: [
                {
                  $toString: '$_id.month',
                },
                '-',
                {
                  $toString: '$_id.year',
                },
              ],
            },
            orders: 1,
          },
        },
      ]);
      const result = [];
      const year = new Date().getFullYear();
      for (let month = 1; month <= 12; month += 1) {
        const monthData = data.find(({ _id }) => _id.month === month);
        if (monthData) {
          result.push({
            Date: monthData.Date,
            orders: monthData.orders,
          });
        } else {
          result.push({
            Date: `${month}-${year}`,
            orders: 0,
          });
        }
      }

      return res.status(200).json(result);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  getProfitByMonth: async (req, res) => {
    try {
      const today = new Date();
      today.setDate(1);
      today.setMonth(0);
      const currentYear = new Date(today).toISOString().split('T')[0];
      today.setFullYear(today.getFullYear() + 1);
      const nextYear = new Date(today).toISOString().split('T')[0];
      const data = await Order.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $gte: ['$created_at', new Date(`${currentYear}T00:00:00`)] },
                { $lt: ['$created_at', new Date(`${nextYear}T00:00:00`)] },
              ],
            },
            status: 'SUCCESS',
          },
        },
        {
          $group: {
            _id: {
              month: { $month: '$created_at' },
              year: { $year: '$created_at' },
            },
            profit: {
              $sum: '$finalAmount',
            },
          },
        },
        { $sort: { month: 1 } },
        {
          $project: {
            Date: {
              $concat: [
                {
                  $toString: '$_id.month',
                },
                '-',
                {
                  $toString: '$_id.year',
                },
              ],
            },
            profit: 1,
          },
        },
      ]);
      const result = [];
      const year = new Date().getFullYear();
      for (let month = 1; month <= 12; month += 1) {
        const monthData = data.find(({ _id }) => _id.month === month);
        if (monthData) {
          result.push({
            Date: monthData.Date,
            profit: monthData.profit,
          });
        } else {
          result.push({
            Date: `${month}-${year}`,
            profit: 0,
          });
        }
      }

      return res.status(200).json(result);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
