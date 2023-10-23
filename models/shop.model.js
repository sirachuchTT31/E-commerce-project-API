const mongoose = require('mongoose')
const shopSchema = mongoose.Schema({
    shop_id: String,
    shop_name: String,
    shop_description: String,
    shop_tel: { type: String, maxLength: 10 },
    shop_email: String,
    shop_score: String,
    partner_status_id: String,
    user_id: String,
}, { timestamps: true })

module.exports = mongoose.model('shops', shopSchema)