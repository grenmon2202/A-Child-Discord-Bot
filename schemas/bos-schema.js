const mongoose = require('mongoose');

const bosSchema = mongoose.Schema({
    guild_id: {
        type: String,
        required: true
    },
    usernames: {
        type: [String],
        required: false
    },
    flags: {
        type: [String],
        required: false
    },
    userIDs: {
        type: [String],
        required: false
    },
});

module.exports = mongoose.model('bos', bosSchema);