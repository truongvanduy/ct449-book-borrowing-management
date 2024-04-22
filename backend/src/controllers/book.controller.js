const ApiError = require('../api-error');
const AuthorService = require('../services/author.service');
const BookService = require('../services/book.service');
const PublisherService = require('../services/publisher.service');
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
  findAll: async (req, res, next) => {
    let documents = [];
    const { q } = req.query;

    // Filter all books with title matching the search query
    const filter = (q && { title: new RegExp(`.*${q}.*`, 'i') }) || {};

    try {
      const bookService = new BookService(MongoDB.client);
      documents = await bookService.find(filter);
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
  create: async (req, res, next) => {
    try {
      // Get authors
      const authorService = new AuthorService(MongoDB.client);
      const authors = await authorService.findAll({});
      if (!authors) {
        return next(new ApiError(404, 'Authors not found'));
      }

      // Get publishers
      const publisherService = new PublisherService(MongoDB.client);
      const publishers = await publisherService.findAll({});
      if (!publishers) {
        return next(new ApiError(404, 'Publishers not found'));
      }

      return res.send({ authors, publishers });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
  store: async (req, res, next) => {
    const bookService = new BookService(MongoDB.client);
    const data = req.body;
    const file = req.files[0];
    try {
      if (!data || !file) {
        return next(new ApiError(400, 'Invalid data'));
      }

      const {
        title,
        authors,
        publisher,
        publishedDate,
        categories,
        quantity,
        price,
      } = data;
      const { filename } = file;
      // validate data
      if (
        !title ||
        !authors ||
        !publisher ||
        !publishedDate ||
        !categories ||
        !quantity ||
        !price
      ) {
        return next(new ApiError(400, 'Invalid data'));
      }
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
};

module.exports = bookController;
