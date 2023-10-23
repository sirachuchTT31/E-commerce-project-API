const shop_model = require('../models/shop.model')

exports.create = async (req, res) => {
    try {
        var shop_code_stamp = "SHOPS"
        var math = Math.random() * 100000000
        let newmath = Math.ceil(math)
        var new_shop_stamp = shop_code_stamp + newmath.toString()
        let newShop = {
            shop_id : new_shop_stamp,
            shop_name: req.body.shop_name,
            shop_description: req.body.shop_description,
            shop_tel: req.body.shop_tel,
            shop_email: req.body.shop_email,
            shop_score: "0",
            partner_status_id: "PARTNER_01"
        }
        if (req.body) {
            const shop_obj = await shop_model(newShop).save()
            res.json({
                status: 200,
                result: shop_obj,
                message: "created successfully"
            });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}