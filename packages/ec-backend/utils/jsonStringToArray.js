const _ = require('lodash');

module.exports = (string) => _.isArray(params.tags) ? params.tags : JSON.parse(params.tags);
