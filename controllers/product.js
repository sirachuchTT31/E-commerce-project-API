const { get } = require('mongoose');
const product_model = require('../models/product.model')
exports.get_products = async (req, res) => {
    res.send('Hello get_products');
}
exports.create = async (req, res) => {
    try {
        console.log(req.body)
        const product_obj = await product_model(req.body).save()
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
        const get_all = await product_model.find({}).exec();
        res.json({
            "status": 200,
            "message": "get result successfully ",
            "result": get_all
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
        res.json({
            "status": 200,
            "message": "get result by id successfully ",
            "result": obj_by_id
        })
    }
    catch (e) {
        console.log(e)
    }
}