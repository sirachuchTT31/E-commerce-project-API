const express = require('express');
const router = express.Router();
const { register, login,get_user_by_id } = require('../controllers/auth.controllers')
router.post('/register', register)
router.post('/login', login)
router.get('/get_user_by_id/:id', get_user_by_id)
module.exports = router;