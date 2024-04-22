const ApiError = require('../api-error');
const AuthorService = require('../services/author.service');
const MongoDB = require('../utils/mongodb.util');

const authorController = {
  index: async (req, res, next) => {
    const authorService = new AuthorService(MongoDB.client);
    try {
      const authors = await authorService.findAll({});
      if (!authors) {
        return next(new ApiError(404, 'Authors not found'));
      }
      return res.send(authors);
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
};

module.exports = authorController;
