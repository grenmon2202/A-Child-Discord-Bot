const mongoose = require('mongoose');

const warning_schema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    guild_id: {
        type: String,
        required: true
    },
    reason: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('warnings', warning_schema);