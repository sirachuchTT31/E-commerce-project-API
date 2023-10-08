const category_model = require('../models/category.model')
// var faker = require("faker");
// var randomCompany = faker.company.companyName();

exports.create = async (req, res) => {
    try{
        cate_code_stamp = "CATGR0"
        // console.log(Math.random())
        // var math = Math.random() * 100
        // res.send("TEST"+math)
        // for (i = 0; i < 20; i++) {
        //     console.log(randomCompany);
        // }
    }
    catch(e){
        console.log(e)
        res.status(500)
    }
}