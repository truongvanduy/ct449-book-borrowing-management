const express = require('express');
const bookController = require('../controllers/book.controller');
const userController = require('../controllers/user.controller');
const { requireAuth, checkUser } = require('../middleware/auth.middleware');
const borrowingController = require('../controllers/borrowing.controller');
const sendSuccess = require('../middleware/success.middleware');

const router = express.Router();

router.route('/').get(bookController.findAll);
router.route('/api/books').get(bookController.findAll);
router.route('/api/books/:id').get(bookController.findOne);

router
  .route('/api/user')
  .get(userController.findByEmail)
  .post(userController.create);
router.route('/api/user/:id').get(userController.findById);

// Borrowing
router
  .route('/api/borrowings/')
  .get(requireAuth, checkUser, borrowingController.index)
  .post(
    requireAuth,
    checkUser,
    borrowingController.findOne,
    borrowingController.show
  )
  .patch(
    requireAuth,
    checkUser,
    borrowingController.findOne,
    borrowingController.register
  );

router.get(
  '/api/borrowings/:bookId',
  requireAuth,
  checkUser,
  borrowingController.verifyBorrowing,
  sendSuccess
);

router.route('/api/signin').post(userController.signin);
router.route('/api/signout').post(userController.signout);

module.exports = router;
