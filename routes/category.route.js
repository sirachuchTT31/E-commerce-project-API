const express = require('express');
const router = express.Router();
const { create,get_by_id } = require('../controllers/category.controllers')
router.post('/category/create', create)
router.get('/category/get_by_id/:id',get_by_id)
module.exports = router;