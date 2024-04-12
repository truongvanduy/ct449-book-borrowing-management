const { ObjectId } = require('mongodb');
const ApiError = require('../api-error');
const BookService = require('../services/book.service');
const BorrowingService = require('../services/borrowing.service');
const MongoDB = require('../utils/mongodb.util');

const borrowingController = {
  index: async (req, res, next) => {
    try {
      const borrowingService = new BorrowingService(MongoDB.client);
      const exitstingBorrowing = await borrowingService.findAll({
        userId: req.user._id,
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

  findOne: async (req, res, next) => {
    try {
      const borrowingService = new BorrowingService(MongoDB.client);
      const exitstingBorrowing = await borrowingService.findOne({
        userId: req.user._id,
        bookId: req.params.bookId,
      });
      if (exitstingBorrowing) {
        if (
          exitstingBorrowing.status !== 'initialized' &&
          exitstingBorrowing.status !== 'returned'
        ) {
          return next(new ApiError(404, 'Bạn đang mượn sách này'));
        }
      }
      return res.send({ status: 'ok' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },

  show: async (req, res, next) => {
    try {
      const { bookId } = req.body;

      const borrowingService = new BorrowingService(MongoDB.client);
      const exitstingBorrowing = await borrowingService.findOne({
        userId: req.user._id,
        bookId: bookId,
      });
      console.log(exitstingBorrowing);
      if (exitstingBorrowing && exitstingBorrowing.status === 'initialized') {
        return res.send({ ...exitstingBorrowing });
      }

      const now = Date.now();
      const borrowing = await borrowingService.create({
        userId: req.user._id,
        bookId: bookId,
        registered_at: new Date(now).toISOString(),
        pickup_at: new Date(now + 259200000).toISOString(),
        return_at: new Date(now + 2592000000).toISOString(),
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
      const { bookId } = req.body;

      const borrowingService = new BorrowingService(MongoDB.client);
      const result = await borrowingService.update(
        {
          userId: req.user._id,
          bookId: bookId,
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
