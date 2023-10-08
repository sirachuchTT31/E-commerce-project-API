const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    category_code: String,
    category_name: String,
    category_description: String,

}, { timestamps: true })
module.exports = mongoose.model('category', categorySchema)