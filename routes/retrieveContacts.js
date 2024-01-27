const express = require('express');
const router = express.Router();

const retrieveContactsController = require('../controllers/retrieveContactsController');

router.get('/:id', async (req, res) => {
    const { data_store } = req.body;

    try {
        if (data_store && data_store.toLowerCase() === 'database') {
            await retrieveContactsController.localViewContact(req, res);
        } else {
            await retrieveContactsController.viewContact(req, res);
        }
    } catch (err) {
        console.error('Error retrieving contact: ', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
});

module.exports = router;