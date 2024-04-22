const express = require('express');
const bookController = require('../controllers/book.controller');
const borrowingRouter = require('./borrowing.route');
const userRouter = require('./user.route');
const adminRouter = require('./admin.route');
const bookrouter = require('./book.route');

const router = express.Router();

router.route('/').get(bookController.findAll);
console.log('haah');

router.use('/users', userRouter);
router.use('/books', bookrouter);
router.use('/borrowings', borrowingRouter);
router.use('/admin', adminRouter);

module.exports = router;
