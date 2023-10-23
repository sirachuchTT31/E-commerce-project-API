const express = require('express');
const router = express.Router();
const { auth_mdw } = require('../middlewere/auth.mdw')
const { create_order_user,get_all } = require('../controllers/order.controllers')
router.post('/order/create',auth_mdw, create_order_user)
router.get('/order/get_all',auth_mdw, get_all)
module.exports = router;