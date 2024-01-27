require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2');

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

exports.localDeleteContact = async (req, res) => {
    const contactId = req.params.id;

    try {
        const databasePool = mysql.createPool({
            host: 'localhost',
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const query = 'DELETE FROM contacts WHERE id = ?';
        await databasePool.promise().execute(query, [contactId]);

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error('Error deleting local contact: ', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
};
