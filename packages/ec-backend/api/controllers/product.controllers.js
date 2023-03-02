/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
const multer = require('multer');
const path = require('path');
const _ = require('lodash');
const query = require('../../utils/query');
const handleError = require('../../utils/handleErrorResponse');
const validate = require('../validations/product.validations');
const productService = require('../services/product.services');

const MODEL_NAME = 'Product';
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/images');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});
const upload = multer({ storage }).array('files.images');

module.exports = {
  createProduct: async (req, res) => {
    upload(req, res, async (uploadError) => {
      try {
        if (uploadError) {
          const message = uploadError.message || 'Could not upload product images';
          const data = message.replace(/ /g, '.');
          return handleError.badGateway(res, message, data);
        }

        const { error } = validate.createSchema(req.body);
        if (error) {
          const message = error.message || 'Params is not valid';
          const data = message.replace(/ /g, '.');
          return handleError.badRequest(res, message, data);
        }

        const product = await productService.createProduct(req.body, req.files);
        return res.status(201).json(product);
      } catch (ex) {
        return handleError.badGateway(res, `Error: ${ex}`);
      }
    });
  },

  findProducts: async (req, res) => {
    try {
      const queryParams = req.query;
      const populates = [
        {
          path: 'options',
          model: 'Variation',
        },
      ];
      const page = await query(MODEL_NAME).findPage(queryParams, populates);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await query('Product').findById(id, 'options');
      if (!product) {
        return handleError.notFound(
          res,
          'Product not found',
          'Product.not.found',
        );
      }

      return res.status(200).json(product);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findProductBySlug: async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await query('Product').findOne({ slug }, 'options');
      if (!product) {
        return handleError.notFound(
          res,
          'Product not found',
          'Product.not.found',
        );
      }

      return res.status(200).json(product);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  deleteProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await query('Product').deleteById(id);
      if (!product) {
        return handleError.notFound(
          res,
          'Product not found',
          'Product.not.found',
        );
      }

      return res.status(200).json(true);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  updateProductById: async (req, res) => {
    upload(req, res, async (uploadError) => {
      try {
        if (uploadError) {
          const message = uploadError.message || 'Could not upload product images';
          const data = message.replace(/ /g, '.');
          return handleError.badGateway(res, message, data);
        }

        const { error } = validate.updateSchema(req.body);
        if (error) {
          const message = error.message || 'Params is not valid';
          const data = message.replace(/ /g, '.');
          return handleError.badRequest(res, message, data);
        }

        const { id } = req.params;
        const product = await productService.updateProductById(id, req.body, req.files);
        if (!product) {
          return handleError.notFound(
            res,
            'Product not found',
            'Product.not.found',
          );
        }

        return res.status(201).json(product);
      } catch (ex) {
        return handleError.badGateway(res, `Error: ${ex}`);
      }
    });
  },

  countProducts: async (req, res) => {
    try {
      const queryParams = req.query;
      const count = await query('Product').count(queryParams);
      return res.status(200).json(count);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  searchProducts: async (req, res) => {
    try {
      const { _q } = req.query;
      _.unset(req.query, '_q');
      const queryParams = {
        ...req.query,
        $text: { $search: _q },
      };
      const populates = [
        {
          path: 'options',
          model: 'Variation',
        },
      ];
      const page = await query(MODEL_NAME).findPage(queryParams, populates);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },

  findRelatedProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const populates = [
        {
          path: 'options',
          model: 'Variation',
        },
      ];
      const product = await query(MODEL_NAME).findById(id);
      if (!product) {
        return handleError.notFound(
          res,
          'Product not found',
          'Product.not.found',
        );
      }

      const queryParams = {
        $and: [
          {
            $or: [
              { category: product.category },
              { tags: { $in: product.tags } },
              { price: { $gte: product.price - 50000, $lte: product.price + 50000 } },
            ],
          },
          { _id: { $nin: [product._id] } },
        ],
        ...req.query,
      };
      const page = await query(MODEL_NAME).findPage(queryParams, populates);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
