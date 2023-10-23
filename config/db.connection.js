const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_URI
const conDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("DB Connection Successfully Connected  !!")
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = conDB