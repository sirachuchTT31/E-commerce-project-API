const express = require('express');
const router = express.Router();
const { create } = require('../controllers/cart.controllers')
const { auth_mdw } = require('../middlewere/auth.mdw')
router.post('/cart/create', auth_mdw, create)
module.exports = router;