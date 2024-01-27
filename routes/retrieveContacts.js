const express = require('express');
const router = express.Router();

const retrieveContactsController = require('../controllers/retrieveContactsController');

router.get('/:id', retrieveContactsController.viewContactById);

module.exports = router;