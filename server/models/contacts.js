let mongoose = require('mongoose');

// create a model class
let contactSchema = mongoose.Schema({
    name: String,
    number: Number,
    email: String
},
{
  collection: "contacts"
});

module.exports = mongoose.model('contacts', contactSchema);