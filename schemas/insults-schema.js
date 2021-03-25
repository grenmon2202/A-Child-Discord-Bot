const mongoose = require('mongoose');

const insults_schema = mongoose.Schema({
    insult_text: {
        type: String,
        required: true
    },
    contributed_by: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('insults', insults_schema);