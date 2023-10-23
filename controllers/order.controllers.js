const order_user_model = require('../models/order_user_model')
const moongoose = require('mongoose');
exports.create_order_user = async (req, res) => {
    try {
        if (req.body) {
            var new_model = {
                user_id: req.body.user_id,
                order_detail: [
                    {
                        product_qty: req.body.order_detail[0].product_qty,
                        price_by_unit: req.body.order_detail[0].price_by_unit,
                        total_price: req.body.order_detail[0].total_price,
                        product_id: req.body.order_detail[0].product_id,
                        shop_id: req.body.order_detail[0].shop_id,
                        category_code: req.body.order_detail[0].category_code,
                        order_status: "APSTEP1",
                    }
                ]
            }
            const order_new_obj = await order_user_model(new_model).save()
            res.json({
                status: 200,
                result: order_new_obj,
                message: "created successfully"
            })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.get_all = async (req, res) => {
    try {
        const order_new_obj = await order_user_model.aggregate([
            // {$match : {_id : product_id}},
            {
                $match: {
                    _id: new moongoose.Types.ObjectId("65353791316281d54093588f")
                }
            },
            // { $addFields: { "id_products_id": { "$toString": "$_id" }}},
            {
                $lookup: {
                    from: 'products',
                    localField:  'order_detail.product_id',
                    foreignField: 'userObjectId',
                    as: 'detail'
                }
            }
        ]).exec()
        res.json(order_new_obj)
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}