const express = require('express');
const router = express.Router();
const { get_products, create, get_all, get_by_id, update, remove } = require('../controllers/product')
//middlewere
const { auth_mdw } = require('../middlewere/auth.mdw')
router.get('/product/products', get_products)
router.post('/product/create', create)
router.get('/product/get_by_id/:id', get_by_id)
router.get('/product/get_all', get_all)
router.put('/product/update/:id', update)
router.delete('/product/delete/:id', remove)
module.exports = router;