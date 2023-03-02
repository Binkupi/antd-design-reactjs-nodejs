const query = require('../../utils/query');
const handleError = require('../../utils/handleErrorResponse');

const ROLE_MODEL_NAME = 'Role';

module.exports = {
  findRoles: async (req, res) => {
    try {
      const queryParams = req.query;
      const page = await query(ROLE_MODEL_NAME).findPage(queryParams);
      return res.status(200).json(page);
    } catch (ex) {
      return handleError.badGateway(res, `Error: ${ex}`);
    }
  },
};
