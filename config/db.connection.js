const mongoose = require('mongoose')
const conDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/e_commerce')
        console.log("DB Connection Successfully Connected  !!")
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = conDB