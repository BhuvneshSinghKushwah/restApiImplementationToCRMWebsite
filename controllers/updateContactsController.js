require('dotenv').config();
const axios = require('axios');

exports.updateContact = async (req, res) => {
    const { mobile_number, email } = req.body;

    if (mobile_number !== undefined || email !== undefined) {
        const updatedContact = {};

        if (mobile_number !== undefined && mobile_number.trim() !== '') {
            updatedContact.mobile_number = mobile_number.trim();
        }

        if (email !== undefined && email.trim() !== '') {
            updatedContact.email = email.trim();
        }

        try {
            const headers = {
                'Authorization': `Token token=${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.patch(`${process.env.API_URL}/api/contacts/${req.params.id}`, updatedContact, { headers });

            const result = response.data;
            console.log(result);
            res.status(200).json(result);
        } catch (err) {
            console.error('Error updating contact: ', err.message);
            res.status(500).json({ error: `Internal Server Error ${err.message}` });
        }
    } else {
        res.status(400).json({ error: 'At least one of mobile_number or email must be provided in the request body' });
    }
};
