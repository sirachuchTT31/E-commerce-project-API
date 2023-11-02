const mongoose = require('mongoose')
const transaction = mongoose.Schema({
    transaction_id: String,
    shop_id: String,
    order_user_id: String,
    order_partner_id : String ,
    order_status: String,
    user_id_customer: String,
    product_id: String,
}, { timestamps: true });
module.exports = mongoose.model('transaction_stamp', transaction)

//write order to database 