const express = require('express');
const bookController = require('../controllers/book.controller');

const router = express.Router();

router.get('/', bookController.findAll);
router.get('/:id', bookController.findOne);
