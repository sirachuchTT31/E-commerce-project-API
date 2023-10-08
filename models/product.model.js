const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    product_name: String,
    product_detail: String,
    product_price: Number,
    product_qty : Number ,
    product_type: [ 
    ],
    product_for_company: String,
    global_image: String,
    category_code : String, 
}, { timestamps: true })

module.exports = mongoose.model('products', productSchema)