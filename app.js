require('dotenv').config();
const express = require ('express');
const mongoose = require ('mongoose');
const ContactMessage = require('./models/contactMessage'); 
const cors = require('cors');




const allowedOrigins = ['https://port-psi-liard.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // allow requests from this origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB Connection Error: ',err));

{/* const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
    });  */}

const app = express();
app.use(express.json())
app.set('view engine', 'ejs');
app.use(cors(corsOptions));

app.post('/contact', async (req, res) => {
    {/*console.log('Contact route hit'); */}
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