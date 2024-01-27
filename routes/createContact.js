const express = require('express');
const router = express.Router();

const createContactController = require('../controllers/createContactController');
const validateDataMiddleware = require('../middlewares/validateContactData');

router.post('/', validateDataMiddleware.validateContactData , createContactController.createContact);

module.exports = router;