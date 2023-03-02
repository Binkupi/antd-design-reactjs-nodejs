const query = require('../../utils/query');
const handleError = require('../../utils/handleErrorResponse');
const validate = require('../validations/tag.validations');

const TAG_MODEL_NAME = 'Tag';

module.exports = {
  createTag: async (req, res) => {
    try {
      const { error } = validate.createSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const tag = await query(TAG_MODEL_NAME).create(req.body);
      return res.status(201).json(tag);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findTags: async (req, res) => {
    try {
      const queryParams = req.query;
      const page = await query(TAG_MODEL_NAME).findPage(queryParams);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findTagById: async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await query(TAG_MODEL_NAME).findById(id);
      if (!tag) {
        return handleError.notFound(
          res,
          'Tag not found',
          'Tag.not.found',
        );
      }

      return res.status(200).json(tag);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  deleteTagById: async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await query(TAG_MODEL_NAME).deleteById(id);
      if (!tag) {
        return handleError.notFound(
          res,
          'Tag not found',
          'Tag.not.found',
        );
      }

      return res.status(200).json(true);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  updateTagById: async (req, res) => {
    try {
      const { error } = validate.updateSchema(req.body);
      if (error) {
        const message = error.message || 'Params is not valid';
        const data = message.replace(/ /g, '.');
        return handleError.badRequest(res, message, data);
      }

      const { id } = req.params;
      const tag = await query(TAG_MODEL_NAME).updateById(id, req.body);
      return res.status(200).json(tag);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  countTags: async (req, res) => {
    try {
      const queryParams = req.query;
      const count = await query(TAG_MODEL_NAME).count(queryParams);
      return res.status(200).json(count);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
