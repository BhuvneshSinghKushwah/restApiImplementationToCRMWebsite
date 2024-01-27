const express = require('express');
const router = express.Router();

const updateContactsController = require('../controllers/updateContactsController');
const validateUpdateDataMiddleware = require('../middlewares/validateUpdateContactData');

router.put('/:id',validateUpdateDataMiddleware.validateUpdateContactData , async (req, res) => {
    const { data_store } = req.body;

    try {
        if (data_store && data_store.toLowerCase() === 'database') {
            await updateContactsController.localUpdateContact(req, res);
        } else {
            await updateContactsController.updateContact(req, res);
        }
    } catch (err) {
        console.error('Error updating contact: ', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
});

module.exports = router;