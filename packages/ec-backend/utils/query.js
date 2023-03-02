/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const _ = require('lodash');
const db = require('../api/models');

module.exports = (modelName) => ({
  findPage: async (queryParams, populates = []) => {
    const { page = 1, pageSize = 20, _sort = {} } = queryParams;
    _.unset(queryParams, 'page');
    _.unset(queryParams, 'pageSize');
    _.unset(queryParams, '_sort');
    _.unset(queryParams, 'limit');
    _.unset(queryParams, 'skip');
    if (!_.isEmpty(_sort)) {
      _sort.created_at = 'desc';
    }

    const results = await db[modelName]
      .find(queryParams)
      .sort(_sort)
      .limit(_.toInteger(pageSize))
      .skip((page - 1) * pageSize)
      .populate(populates);

    const total = await db[modelName].countDocuments(queryParams);
    return {
      results,
      pagination: {
        page: _.toInteger(page),
        pageSize: _.toInteger(pageSize),
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    };
  },

  find: (queryParams, populates = []) => {
    const { _sort = {} } = queryParams;
    if (!_.isEmpty(_sort)) {
      _sort.created_at = 'desc';
    }

    return db[modelName]
      .find(queryParams)
      .sort(_sort)
      .populate(populates);
  },

  create: async (params, populates) => {
    const entity = new db[modelName](params);
    await entity.save();

    if (!populates) {
      return entity;
    }

    const result = await db[modelName].populate(entity, populates);
    return result;
  },

  updateById: async (id, params, populates) => {
    let entity = await db[modelName].findByIdAndUpdate(id, params);
    entity = await db[modelName].findById(id);

    if (!populates) {
      return entity;
    }

    const result = await db[modelName].populate(entity, populates);
    return result;
  },

  update: (query, params) => db[modelName].updateMany(query, params),

  deleteById: (id) => db[modelName].findByIdAndDelete(id),

  findById: (id, populates) => db[modelName].findById(id).populate(populates),

  findOne: (params, populates) => db[modelName].findOne(params).populate(populates),

  count: (params) => db[modelName].countDocuments(params),
});
