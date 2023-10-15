const mongoose = require('mongoose')
const cart_detail = mongoose.Schema({
    user_name: String,
    product_List: [
        {
            product_id: String,
            product_name: String,
            product_for_company: String,
            product_detail: String,
            product_price: Number,
            product_qty: Number,
            product_type: String,
            product_image: String

        }
    ]
}, { timestamps: true })
module.exports = mongoose.model('cartdetail', cart_detail)