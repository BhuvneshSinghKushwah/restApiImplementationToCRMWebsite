const express = require('express');
const router = express.Router();

const updateContactsController = require('../controllers/updateContactsController');
const validateUpdateDataMiddleware = require('../middlewares/validateUpdateContactData');

router.put('/:id',validateUpdateDataMiddleware.validateUpdateContactData , updateContactsController.updateContact);

module.exports = router;