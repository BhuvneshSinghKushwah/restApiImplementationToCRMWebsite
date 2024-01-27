require('dotenv').config();
const axios = require('axios');

exports.viewContactById = async (req, res) => {
    try {
        const headers = {
            'Authorization': `Token token=${process.env.API_KEY}`,
            'Content-type': 'application/json'
        };

        const response = await axios.get(`${process.env.API_URL}/api/contacts/${req.params.id}`, { headers });

        const data = response.data;
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error Fetching Data via axios: ', err.message);
        res.status(500).json({ error: err });
    }
};
