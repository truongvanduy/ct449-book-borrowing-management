const { ObjectId } = require('mongodb');
const ApiError = require('../api-error');
const BookService = require('../services/book.service');
const BorrowingService = require('../services/borrowing.service');
const MongoDB = require('../utils/mongodb.util');
const idUtil = require('../utils/id.util');

const borrowingController = {
  index: async (req, res, next) => {
    try {
      const borrowingService = new BorrowingService(MongoDB.client);
      const exitstingBorrowing = await borrowingService.findAll({
        userId: req.user._id,
        status: { $ne: 'initialized' },
      });
      if (!exitstingBorrowing) {
        return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
      }
      console.log(exitstingBorrowing);
      return res.send(exitstingBorrowing);
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },

  verifyBorrowing: async (req, res, next) => {
    let bookId = req?.params?.bookId;
    if (!bookId) {
      return next(new ApiError(404, 'Không tìm thấy sách'));
    }
    bookId = idUtil(bookId);
    try {
      const borrowingService = new BorrowingService(MongoDB.client);
      const exitstingBorrowing = await borrowingService.findOne({
        userId: req.user._id,
        bookId,
      });
      if (exitstingBorrowing != null) {
        if (
          exitstingBorrowing.status !== 'initialized' &&
          exitstingBorrowing.status !== 'returned'
        ) {
          return next(new ApiError(404, 'Bạn đang mượn sách này'));
        }
      }
      return next();
    } catch (error) {
      return next(new ApiError(500, 'Có lỗi xảy ra'));
    }
  },

  findOne: async (req, res, next) => {
    try {
      const borrowingService = new BorrowingService(MongoDB.client);
      const exitstingBorrowing = await borrowingService.findOne({
        userId: req.user._id,
        bookId: idUtil(req.body.bookId),
      });
      if (exitstingBorrowing) {
        if (
          exitstingBorrowing.status !== 'initialized' &&
          exitstingBorrowing.status !== 'returned'
        ) {
          return next(new ApiError(404, 'Bạn đang mượn sách này'));
        }
      }
      return next();
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },

  show: async (req, res, next) => {
    try {
      let { bookId } = req.body;
      bookId = idUtil(bookId);
      const borrowingService = new BorrowingService(MongoDB.client);
      const exitstingBorrowing = await borrowingService.findOne({
        userId: req.user._id,
        bookId,
      });
      if (exitstingBorrowing && exitstingBorrowing.status === 'initialized') {
        return res.send({ ...exitstingBorrowing });
      }

      const now = Date.now();
      const borrowing = await borrowingService.create({
        userId: req.user._id,
        bookId: bookId,
        registered_at: new Date(now),
        pickup_at: new Date(now + 259200000),
        return_at: new Date(now + 2592000000),
        status: 'initialized',
      });
      if (!borrowing) {
        return next(new ApiError(404, 'Can not retrieve borrowing'));
      }
      return res.send({ ...borrowing });
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving book card: ' + error
        )
      );
    }
  },

  register: async (req, res, next) => {
    try {
      let { bookId } = req.body;
      bookId = idUtil(bookId);
      const borrowingService = new BorrowingService(MongoDB.client);
      const result = await borrowingService.update(
        {
          userId: req.user._id,
          bookId,
          status: 'initialized',
        },
        {
          status: 'registered',
        }
      );
      console.log('here');
      if (!result) {
        return next(new ApiError(404, 'Có lỗi xảy ra khi đăng ký mượn sách'));
      }
      res.send({ status: 'ok' });
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving book card: ' + error
        )
      );
    }
  },
};

module.exports = borrowingController;
