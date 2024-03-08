const ApiError = require('../api-error');
const BookService = require('../services/book.service');
const MongoDB = require('../utils/mongodb.util');

const bookController = {
  findOne: async (req, res, next) => {
    const bookService = new BookService(MongoDB.client);
    try {
      const [document] = await bookService.findOne(req.params.id);
      if (!document) {
        return next(new ApiError(404, 'Book not found'));
      }
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving book card: ' + error
        )
      );
    }
  },
  findAll: async (_req, res, next) => {
    let documents = [];
    try {
      const bookService = new BookService(MongoDB.client);
      documents = await bookService.find();
      return res.json(documents);
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving book cards. ' + error
        )
      );
    }
  },
};

module.exports = bookController;
