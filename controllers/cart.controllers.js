const cart_detail_model = require('../models/cart_detail.model')

exports.create = async (req, res) => {
    try {
        let cart_obj = req.body
        const new_cart_obj = await cart_detail_model(cart_obj).save()
        res.json({
            status: 200,
            result: new_cart_obj,
            message: "created successfully"
        });
    }
    catch (e) {
        res.status(5000)
    }
}