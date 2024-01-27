require('dotenv').config();
const axios = require('axios');

exports.deleteContact = async (req, res) => {
    try {
        const headers = {
            'Authorization': `Token token=${process.env.API_KEY}`,
            'Content-type': 'application/json'
        }

        const request = await axios.delete(`${process.env.API_URL}/api/contacts/${req.params.id}`, {headers});
        const deletedContact = request.data;
        console.log(deletedContact);
        res.status(200).json(deletedContact);
    } catch (err) {
        console.error('Error deleting contact: ', err.message);
        res.status(500).json({error: `Internal Server Error ${err.message}`});
    }
};