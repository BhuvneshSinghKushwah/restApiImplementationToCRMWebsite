const express = require('express');
const router = express.Router();

const createContactController = require('../controllers/createContactController');
const validateDataMiddleware = require('../middlewares/validateContactData');

router.post('/', validateDataMiddleware.validateContactData, async (req, res) => {
    const { data_store } = req.body;

    try {
        if (data_store && data_store.toLowerCase() === 'database') {
            await createContactController.localCreateContact(req, res);
        } else {
            await createContactController.createContact(req, res);
        }
    } catch (err) {
        console.error('Error creating contact: ', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
});

module.exports = router;
