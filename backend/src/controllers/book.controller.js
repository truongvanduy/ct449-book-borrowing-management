const ApiError = require('../api-error');
const BookService = require('../services/book.service');
const MongoDB = require('../utils/mongodb.util');

const bookController = {
  findOne: (req, res) => {
    res.send('find one');
  },
  findAll: async (req, res, next) => {
    let documents = [];
    try {
      const bookService = new BookService(MongoDB.client);
      const { name } = req.query;
      if (name) {
        documents = await bookService.findByTitle(name);
      } else {
        documents = await bookService.find({});
      }
      console.log('here');
      return res.send(documents);
    } catch (error) {
      return next(
        new ApiError(500, 'An error occurred while retrieving books. ' + error)
      );
    }
  },
};

module.exports = bookController;
