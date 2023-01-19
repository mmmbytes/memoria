const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    provider: String,
    provider_id: String,
    token: String,
});

module.exports = mongoose.model('User', UserSchema);