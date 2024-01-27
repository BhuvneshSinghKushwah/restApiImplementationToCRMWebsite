const express = require('express');
const router = express.Router();

const deleteContactController = require('../controllers/deleteContactsController');

router.delete('/:id', async (req, res) => {
    const { data_store } = req.body;

    try {
        if (data_store && data_store.toLowerCase() === 'database') {
            await deleteContactController.localDeleteContact(req, res);
        } else {
            await deleteContactController.deleteContact(req, res);
        }
    } catch (err) {
        console.error('Error deleting contact: ', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
});

module.exports = router;