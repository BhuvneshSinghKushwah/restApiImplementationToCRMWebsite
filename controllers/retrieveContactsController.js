require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2');

exports.viewContact = async (req, res) => {
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




exports.localViewContact = async (req, res) => {
    const contactId = req.params.id;

    try {
        const pool = mysql.createPool({
            host: 'localhost',
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        const [results] = await pool.promise().query('SELECT * FROM contacts WHERE id = ?', [contactId]);

        if (results.length > 0) {
            const contactData = results[0];
            console.log('Contact Data:', contactData);
            res.status(200).json(contactData);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        console.error('Error fetching contact data from MySQL:', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
};
