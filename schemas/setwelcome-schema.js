const mongoose = require('mongoose');

const setweclomeSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    channelID: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('welcome-messages', setweclomeSchema);