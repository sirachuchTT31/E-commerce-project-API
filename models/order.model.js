const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    order_by: String,
    order_date: Date,
    order_dsc: String,
    product_id: String,
}, {
    timestamps: {
        order_time_stamps: 'order_time_stamps'
    }
})