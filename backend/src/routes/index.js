const express = require('express');
const bookController = require('../controllers/book.controller');

const router = express.Router();

router.route('/').get(bookController.findAll);
router.route('/book/:id').get(bookController.findOne);

module.exports = router;
