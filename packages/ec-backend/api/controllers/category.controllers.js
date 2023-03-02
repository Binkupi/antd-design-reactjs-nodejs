const query = require('../../utils/query');
const handleError = require('../../utils/handleErrorResponse');
const validate = require('../validations/category.validations');

const CATEGORY_MODEL_NAME = 'Category';

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { error } = validate.createSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const category = await query(CATEGORY_MODEL_NAME).create(req.body);
      return res.status(201).json(category);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findCategories: async (req, res) => {
    try {
      const queryParams = req.query;
      const page = await query(CATEGORY_MODEL_NAME).findPage(queryParams);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await query(CATEGORY_MODEL_NAME).findById(id);
      if (!category) {
        return handleError.notFound(
          res,
          'Category not found',
          'Category.not.found',
        );
      }

      return res.status(200).json(category);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  deleteCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await query(CATEGORY_MODEL_NAME).deleteById(id);
      if (!category) {
        return handleError.notFound(
          res,
          'Category not found',
          'Category.not.found',
        );
      }

      return res.status(200).json(true);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  updateCategoryById: async (req, res) => {
    try {
      const { error } = validate.updateSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const { id } = req.params;
      const category = await query(CATEGORY_MODEL_NAME).updateById(id, req.body);
      return res.status(200).json(category);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  countCategories: async (req, res) => {
    try {
      const queryParams = req.query;
      const count = await query(CATEGORY_MODEL_NAME).count(queryParams);
      return res.status(200).json(count);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
