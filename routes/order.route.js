const express = require('express');
const router = express.Router();
const { auth_mdw } = require('../middlewere/auth.mdw')
const { create_order,get_all_order_by_user_id } = require('../controllers/order.controllers')
router.post('/order/create',auth_mdw, create_order)
router.get('/order/get_all_order_by_user_id/:id',auth_mdw, get_all_order_by_user_id)
module.exports = router;