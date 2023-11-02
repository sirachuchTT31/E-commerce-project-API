const mongoose = require('mongoose')
const orderuserSchema = mongoose.Schema({
    order_user_id: String,
    user_id: String,
    order_detail:
    {
        product_qty: Number,
        price_by_unit: Number,
        total_price: Number,
        product_id: String,
        shop_id: String,
        category_code: String,
        order_status: String,
        order_stamp_edit_status: { type: Date },
        order_stamp_create_order: { type: Date, default: Date.now }
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})
module.exports = mongoose.model('order_user', orderuserSchema)