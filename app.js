const express = require ('express');
const mongoose = require ('mongoose');
const ContactMessage = require('./models/contactMessage'); 
const cors = require('cors');

const uri ="mongodb+srv://mosesayodelee11:<1HPvs1IS2GF2OFFI>@cluster0.m0ad3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ";

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
    });

const app = express();
app.use(express.json())
app.use(cors());
app.set('view engine', 'ejs');

app.post('/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        const newMessage = new ContactMessage({
            firstName,
            lastName,
            email,
            message
        });
        // Save the message to the MongoDB database
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Your message has been received!' });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Error saving message: ' + error.message });
    }
});




app.listen(5000, () => {
    console.log('Serving on port 5000')
})