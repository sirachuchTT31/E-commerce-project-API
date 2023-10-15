const express = require('express');
const router = express.Router();
const { create, get_by_id ,update_cart} = require('../controllers/cart.controllers')
const { auth_mdw } = require('../middlewere/auth.mdw')
router.post('/cart/create', auth_mdw, create)
router.post('/cart/update_cart', auth_mdw, update_cart)
router.get('/cart/get_by_id/:id', auth_mdw, get_by_id)
module.exports = router;