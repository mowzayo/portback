const mongoose = require('mongoose');
const Schema = mongoose.schema;

// Define the schema for a contact message
const contactMessageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // This field is required
    trim: true,     // Trims any extra spaces
    minlength: [2, 'First name must be at least 2 characters long'],
    maxlength: [50, 'First name can be at most 50 characters long']
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long'],
    maxlength: [50, 'Last name can be at most 50 characters long']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        // Basic email validation regex
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  message: {
    type: String,
    required: true,
    trim: true,  // Remove any extra spaces
    minlength: [2, 'Message must be at least 5 characters long'],
    maxlength: [1000, 'Message can be at most 1000 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now  // Automatically set the creation date
  }
});

// Create a model based on the schema
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

module.exports = ContactMessage;
