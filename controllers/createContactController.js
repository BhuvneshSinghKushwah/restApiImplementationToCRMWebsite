require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2');

exports.createContact = async (req, res) => {
    const contactData = req.body;

    try {
        const headers = {
            'Authorization': `Token token=${process.env.API_KEY}`,
            'Content-type': 'application/json'
        }

        const request = await axios.post(`${process.env.API_URL}/api/contacts`, contactData, { headers });
        const createdContact = request.data;
        console.log(createdContact);
        res.status(200).json(createdContact);
    } catch (err) {
        console.error('Error creating contact: ', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
};



exports.localCreateContact = async (req, res) => {
    const contactData = req.body;

    try {
        const { id, first_name, last_name, email, mobile_number } = contactData;

        const databasePool = mysql.createPool({
            host: 'localhost',
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const query = id
            ? 'INSERT INTO contacts (id, first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?, ?)'
            : 'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)';

        const [result] = await databasePool.promise().query(query, id ? [id, first_name, last_name, email, mobile_number] : [first_name, last_name, email, mobile_number]);

        const createdContact = {
            id: id || result.insertId,
            first_name,
            last_name,
            email,
            mobile_number
        };

        console.log('Created contact in database:', createdContact);
        res.status(200).json(createdContact);
    } catch (err) {
        console.error('Error creating local contact in database: ', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
};

