
const user_model = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.register = async (req, res) => {
    try {
        //var user_obj = req.body
        const { user_name, user_password, name, lastname, user_profile } = req.body
        var user = await user_model.findOne({ user_name })
        if (user) {
            return res.json({
                status: 400,
                message: "User already registered"
            })
        }
        else {
            //encrypt password
            //สร้างตัวอักษรมั่วๆ 15 ตัว
            const salt = await bcrypt.genSalt(10)
            user = new user_model({
                user_name,
                user_password,
                name,
                lastname,
                user_profile,
                role: "User"
            })
            // เข้ารหัส encrypt password 
            user.user_password = await bcrypt.hash(user_password, salt)
            await user.save()
            res.json({
                status: 200,
                message: "Registered successfully"
            })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            status: 500,
            message: "Error service registration"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { user_name, user_password } = req.body
        var user = await user_model.findOneAndUpdate({ user_name }, { new: true })
        if (user) {
            // user_password คือ รับมาจากหน้าบ้าน
            // compare เป็นการถอดรหัส 
            // user.user_password ถอดรหัสจาก db
            const matchPass = await bcrypt.compare(user_password, user.user_password)
            if (!matchPass) {
                return res.json({
                    status: 400,
                    message: "Invalid password"
                })
            }
            else {
                var payload = {
                    user_name: user.user_name,
                    name: user.name,
                    lastname: user.lastname,
                    password: user.password,
                    role : user.role,
                    user_profile: user.user_profile
                }
                jwt.sign(payload, 'jwtsecret', { expiresIn: 60000000 }, (err, token) => {
                    if (err) throw err;
                    else res.json({
                        result: {
                            token,
                            payload,
                            time_out_token: 60000000
                        },
                        status: 200,
                        message: "Login successful",
                    })
                })
            }
        }
        else {
            res.json({
                status: 500,
                message: "User not found"
            })
        }
    }
    catch (e) {
        return null
    }
}
