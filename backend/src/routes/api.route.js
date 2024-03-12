const express = require('express');
const bookController = require('../controllers/book.controller');

const router = express.Router();

router.get('/book', bookController.getBooks);
router.get('/:id', bookController.findOne);
