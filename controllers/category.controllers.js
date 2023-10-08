const category_model = require('../models/category.model')
// var faker = require("faker");
// var randomCompany = faker.company.companyName();

exports.create = async (req, res) => {
    try {
        var cate_code_stamp = "CATGR"
        var math = Math.random() * 100000
        let newmath = Math.ceil(math)
        var new_cate_stamp = cate_code_stamp + newmath.toString()
        // res.send(new_cate_stamp)
        let new_category = {
            category_code: new_cate_stamp,
            category_name: req.body.category_name,
            category_description: req.body.category_description
        }
        const category_obj_rs = await category_model(new_category).save()
        res.json({
            status: 200,
            result: category_obj_rs,
            message: "created successfully"
        });
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}

exports.get_by_id = async (req, res) => {
    try {
        const _id = req.params.id
        const category_by_id_obj = await category_model.findOne({ category_code: _id }).exec();
        res.json({
            "status": 200,
            "message": "get result by id successfully ",
            "result": category_by_id_obj
        })
    }
    catch (e) {
        console.log(e)
        res.status(500)
    }
}