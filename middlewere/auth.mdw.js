
const jwt = require('jsonwebtoken')
exports.auth_mdw = async (req, res, next) => {
    try {
        const token = req.headers["token"]
        if (!token) {
            return res.status(401).json({
                "status": 401,
                "message": "dont have token !"
            })
        }
        else {
            //jwtsecret คือ key ที่สร้างตั่งแต่ auth.controller
            //verify เช็คว่า token ที่ส่งมามีจริงไหม
            const decoded = jwt.verify(token, 'jwtsecret')
            req.user = decoded.user
        }
        next()
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            "status": 500,
            "message": "Token Invalid"
        })
    }
}