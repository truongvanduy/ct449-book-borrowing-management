const express = require('express');
const bookController = require('../controllers/book.controller');
const bookRouter = express.Router();

bookRouter.route('/').get(bookController.findAll);
bookRouter.route('/:id').get(bookController.findOne);

module.exports = bookRouter;
