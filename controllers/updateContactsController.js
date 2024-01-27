require('dotenv').config();
const axios = require('axios');

exports.updateContact = async (req, res) => {
    const updateData = req.body;

    try {
        const headers = {
            'Authorization': `Token token=${process.env.API_KEY}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.put(`${process.env.API_URL}/api/contacts/${req.params.id}`, updateData, { headers });

        const result = response.data;
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error updating contact: ', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
};
