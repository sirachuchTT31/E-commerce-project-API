const order_user_model = require('../models/order_user_model')
const moongoose = require('mongoose');
const transaction_model = require('../models/transaction_stamp_model')
const order_partner_mode = require('../models/order_partner_model')
exports.create_order = async (req, res) => {
    try {
        if (req.body) {
            var order_user_code_stamp = "OUSER"
            var math = Math.random() * 1000000
            let newmath_order_user = Math.ceil(math)
            var new_order_user_stamp = order_user_code_stamp + newmath_order_user.toString()
            var new_model = {
                user_id: req.body.user_id,
                order_user_id: new_order_user_stamp,
                order_detail: {
                    product_qty: req.body.order_detail.product_qty,
                    price_by_unit: req.body.order_detail.price_by_unit,
                    total_price: req.body.order_detail.total_price,
                    product_id: req.body.order_detail.product_id,
                    shop_id: req.body.order_detail.shop_id,
                    category_code: req.body.order_detail.category_code,
                    order_status: "APSTEP1",
                }

            }
            const order_new_obj = await order_user_model(new_model).save()
            //set create order_partner 
            var order_partner_code_stamp = "OPTNR"
            let newmath_order_partner = Math.ceil(math)
            var new_order_partner_stamp = order_partner_code_stamp + newmath_order_partner.toString()
            var new_model_order_partner_model = {
                order_partner_id: new_order_partner_stamp,
                shop_id: req.body.order_detail.shop_id,
                order_detail: {
                    user_customer_id: req.body.user_id,
                    product_qty: req.body.order_detail.product_qty,
                    price_by_unit: req.body.order_detail.price_by_unit,
                    total_price: req.body.order_detail.total_price,
                    product_id: req.body.order_detail.product_id,
                    category_code: req.body.order_detail.category_code,
                    order_status: "APSTEP1",
                }

            }
            const order_new_partner_obj = await order_partner_mode(new_model_order_partner_model).save();
            //set create transaction 
            var transaction_code_stamp = "TRANS"
            let newmath_transaction = Math.ceil(math)
            var new_transaction_stamp = transaction_code_stamp + newmath_transaction.toString()
            var new_model_transaction_model = {
                transaction_id: new_transaction_stamp,
                shop_id: req.body.order_detail.shop_id,
                order_user_id: new_order_user_stamp,
                order_partner_id: new_order_partner_stamp,
                order_status: "APSTEP1",
                user_id_customer: req.body.user_id,
                product_id: req.body.order_detail.product_id,
            }
            const transaction_new_obj = await transaction_model(new_model_transaction_model).save()
            let new_result = {
                transaction_id: transaction_new_obj.transaction_id
            }
            res.json({
                status: 200,
                result: new_result,
                message: "created successfully"
            })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.get_all_order_by_user_id = async (req, res) => {
    //fig bug merge order_all 
    try {
        var user_Id = req.params.id
        // fig bug join 
        const order_new_obj = await order_user_model.aggregate([
            { $match: { user_id: user_Id } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'order_detail.product_id',
                    foreignField: 'product_id',
                    as: 'detail_product'
                }
            },
            { $unwind: "$detail_product" },
            {
                $lookup: {
                    from: 'shops',
                    localField: 'order_detail.shop_id',
                    foreignField: 'shop_id',
                    as: 'detail_shop'
                },

            },
            { $unwind: "$detail_shop" },
            {
                $project: {
                    "user_id": 1,
                    "order_detail.order_status": 1,
                    "order_detail.price_by_unit": 1,
                    "order_detail.product_qty": 1,
                    "order_detail.total_price": 1,
                    "order_detail.order_stamp_create_order": 1,
                    "detail_product.product_name": 2,
                    "detail_product.product_detail": 2,
                    "detail_product.global_image": 2,
                    "detail_product.category_code": 2,
                    "detail_product.product_id": 2,
                    "detail_shop.shop_id": 1,
                    "detail_shop.shop_name": 1,
                    "detail_shop.shop_email": 1,
                    "detail_shop.partner_status_id": 1,
                    "detail_shop.user_id": 1,

                }
            },
            // { $group: { user_id: user_Id } },
            // { $merge: { into: "detail_all", on: "user_id", whenMatched: "merge", whenNotMatched: "insert" } }
        ]).exec()
        let new_order = {}
        for (let k = 0; k < order_new_obj.length; k++) {
            new_order = {
                _id: order_new_obj[k]._id,
                user_id: order_new_obj[k].user_id,
                order_detail: order_new_obj[k].order_detail,
                product: order_new_obj[k].detail_product,
                shop: order_new_obj[k].detail_shop
            }
        }
        res.json({
            "status": 200,
            "message": "get result successfully ",
            "result": new_order
        })
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}