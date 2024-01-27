require('dotenv').config();
const express = require('express');
const app = express();

const retrieveContactsRouter = require('./routes/retrieveContacts.js');
const createContactRouter = require('./routes/createContact.js');
const deleteContactRouter = require('./routes/deleteContact.js');
const updateContactRouter = require('./routes/updateContact.js');

app.use(express.json());


app.use('/api/view/contacts', retrieveContactsRouter);
app.use('/api/create/contacts', createContactRouter);
app.use('/api/delete/contacts', deleteContactRouter);
app.use('/api/update/contacts', updateContactRouter);

app.use('/home', (req, res) => {
    console.log("user is at home page");
    res.status(200).json({ message: "You are at homepage" });
});

app.use((req, res) => {
    console.log('Route not found');
    res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

