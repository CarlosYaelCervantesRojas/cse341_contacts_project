const { ObjectId } = require('mongodb');

const statusCodes = require('../utilities/statusCodes');

function validateId(req, res, next) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        const result = {
          status: statusCodes.badRequest,
          success: false,
          error: { message: 'Invalid ID format.' }
        };
        return res.status(result.status).json(result);
      }

    next();
}

module.exports = {validateId};