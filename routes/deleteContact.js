const express = require('express');
const router = express.Router();

const deleteContactController = require('../controllers/deleteContactsController');

router.delete('/:id', deleteContactController.deleteContact);

module.exports = router;