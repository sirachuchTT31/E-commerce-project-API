const express = require('express');
const router = express.Router();
const { create } = require('../controllers/shop.controllers')

router.post('/shop/create', create)
module.exports = router;