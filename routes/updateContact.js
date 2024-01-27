const express = require('express');
const router = express.Router();

const updateContactsController = require('../controllers/updateContactsController');

router.put('/:id', updateContactsController.updateContact);

module.exports = router;