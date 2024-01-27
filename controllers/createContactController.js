require('dotenv').config();
const axios = require('axios');

exports.createContact = async(req, res) => {
    const contactData = req.body;

    try {
        const headers = {
            'Authorization': `Token token=${process.env.API_KEY}`,
            'Content-type': 'application/json'
        }

        const request = await axios.post(`${process.env.API_URL}/api/contacts`, contactData, {headers});
        const createdContact = request.data;
        console.log(createdContact);
        res.status(200).json(createdContact);
    } catch (err) {
        console.error('Error creating contact: ', err.message);
        res.status(500).json({error: `Internal Server Error ${err.message}`});
    }
}