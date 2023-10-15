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
        res.status(500)
    }
}


exports.update_cart = async (req, res) => {
    try {
        if (req.body) {
            var newUser_name = req.body.user_name
            var newProduct_List = req.body.product_List
            console.log("LIST : ",newProduct_List)
            newProduct_List.forEach(async (product) => {
                let find_one = await cart_detail_model.findOne({ user_name: newUser_name }, { product_List: { $elemMatch: { product_id: product.product_id } } }).exec()
                console.log(find_one.product_List.length)
                if (find_one.product_List.length > 0) {
                    const set_new_products = { $set: { "product_List.$.product_qty": product.product_qty, "product_List.$.product_type": product.product_type } }
                    const update_cart_new_old_obj = await cart_detail_model.updateOne({ user_name: newUser_name, "product_List.product_id": product.product_id }, set_new_products, { new: true }).exec()
                    if (update_cart_new_old_obj.modifiedCount > 0) {
                        res.json({
                            status: 200,
                            //result: update_cart_new_old_obj,
                            message: "You update cart successfully"
                        })
                    }
                }
                else {
                    const update_cart_new_old_obj = await cart_detail_model.updateOne({ user_name: newUser_name }, { $push: { product_List: newProduct_List } }, { new: true }).exec()
                    res.json({
                        status: 200,
                        //result: update_cart_new_old_obj,
                        message: "You update push new cart successfully"
                    })
                }
            })
        }
    }
    catch (e) {
        res.status(500)
    }
}

exports.get_by_id = async (req, res) => {
    try {
        const id = req.params.id
        const get_by_id = await cart_detail_model.findOne({ user_name: id }).exec();
        res.json({
            status: 200,
            result: get_by_id,
            message: "get by one successfully"
        })
    }
    catch (e) {
        res.status(500)
    }
}