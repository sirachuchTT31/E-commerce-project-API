const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    user_name: String,
    user_password: String,
    name: String,
    lastname: String,
    user_profile: String,
    role: String
}, { timestamps: true });
module.exports = mongoose.model('users', userSchema)