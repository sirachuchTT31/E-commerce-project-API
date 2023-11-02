const moongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId; // import object ID
const product_model = require('../models/product.model')
const shop_model = require('../models/shop.model')

exports.get_products = async (req, res) => {
    res.send('Hello get_products');
}
exports.create = async (req, res) => {
    try {
        var pd_code_stamp = "PRODC"
        var math = Math.random() * 100000
        let newmath = Math.ceil(math)
        var new_pd_stamp = pd_code_stamp + newmath.toString()
        let new_produtct = {
            product_id : new_pd_stamp , 
            product_name: req.body.product_name,
            product_detail: req.body.product_detail,
            product_price: req.body.product_price,
            product_qty: req.body.product_qty,
            product_type : req.body.product_type,
            product_for_company: req.body.product_for_company,
            global_image: req.body.global_image,
            category_code: req.body.category_code,
        }
         const product_obj = await product_model(new_produtct).save()
        res.json({
            "status": 200,
            "result": product_obj,
            "message": "created successfully"
        }
        )
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            "status": 500,
            "message": "service error creating product"
        })
    }
}
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        //new คืออัพเดทวันเวลา
        const update_obj = await product_model.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec();
        res.json(update_obj)
    }
    catch (e) {
        console.log(e)
    }
}
exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const remove = await product_model.findOneAndDelete({ _id: id }).exec();
        res.json({
            "status": 200,
            "result": true,
            "message": "remove successfully"
        }
        )
    }
    catch (e) {

    }
}
exports.get_all = async (req, res) => {
    try {
        console.log(req.body)
        //const get_all = await product_model.find({}).exec();
        const get_all_where_shop = await product_model.aggregate([
            {
                $lookup: {
                    from: 'shops',
                    localField: 'shop_id',
                    foreignField: 'shop_id',
                    as: 'detail'
                }
            }
        ]).exec();
        // console.log(get_all_where_shop)
        res.json({
            "status": 200,
            "message": "get result successfully ",
            "result": get_all_where_shop
        })
    }
    catch (e) {
        console.log(e)
    }
}

exports.get_by_id = async (req, res) => {
    try {
        const id = req.params.id
        const obj_by_id = await product_model.findOne({ _id: id }).exec();
        //convert to field _id (ObjectId)
        let _new_id = new moongoose.Types.ObjectId(id)
        const obj_by_id_query = await product_model.aggregate([
            {
                $match: {
                    _id: _new_id
                }
            },
            {
                $lookup: {
                    from: 'shops',
                    localField: 'shop_id',
                    foreignField: 'shop_id',
                    as: "detail"
                }
            }
        ]).exec();
        //console.log(obj_by_id_query)
        let new_obj_result = {

        }
        for (let k = 0; k < obj_by_id_query.length; k++) {
             new_obj_result = {
                _id: new moongoose.Types.ObjectId(obj_by_id_query[k].id),
                product_name: obj_by_id_query[k].product_name,
                product_type: obj_by_id_query[k].product_type,
                product_detail: obj_by_id_query[k].product_detail,
                product_price: obj_by_id_query[k].product_price,
                product_qty: obj_by_id_query[k].product_qty,
                product_for_company: obj_by_id_query[k].product_for_company,
                global_image: obj_by_id_query[k].global_image,
                category_code: obj_by_id_query[k].category_code,
                shop_id: obj_by_id_query[k].shop_id,
                shop_detail: obj_by_id_query[k].detail,
            }
            console.log(new_obj_result)
        }
        

        res.json({
            "status": 200,
            "message": "get result by id successfully ",
            "result": new_obj_result
        })
    }
    catch (e) {
        console.log(e)
    }
}