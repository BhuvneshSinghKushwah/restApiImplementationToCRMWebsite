require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2');

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

exports.localUpdateContact = async (req, res) => {
    const updateData = req.body;
    const contactId = req.params.id;

    try {
        const { email, mobile_number } = updateData;

        if (email || mobile_number) {
            const pool = mysql.createPool({
                host: 'localhost',
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });

            let setClause = '';
            const values = [];

            if (email) {
                setClause += 'email=?, ';
                values.push(email);
            }

            if (mobile_number) {
                setClause += 'mobile_number=?, ';
                values.push(mobile_number);
            }

            setClause = setClause.replace(/,\s*$/, '');

            const [result] = await pool.promise().query(
                `UPDATE contacts SET ${setClause} WHERE id=?`,
                [...values, contactId]
            );

            if (result.affectedRows > 0) {
                const updatedContact = {
                    id: contactId,
                    email,
                    mobile_number
                };

                console.log('Updated contact in database:', updatedContact);
                res.status(200).json(updatedContact);
            } else {
                res.status(404).json({ error: 'Contact not found' });
            }
        } else {
            res.status(400).json({ error: 'No valid fields provided for update' });
        }
    } catch (err) {
        console.error('Error updating contact in MySQL:', err.message);
        res.status(500).json({ error: `Internal Server Error ${err.message}` });
    }
};


