const express = require('express');
const router = express.Router();

const createContactController = require('../controllers/createContactController');

router.post('/', createContactController.createContact);

module.exports = router;