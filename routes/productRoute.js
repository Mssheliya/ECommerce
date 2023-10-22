const express = require('express');
const Route = express.Router();
const auth = require('../middelware/auth');
const {add_product,upload} = require('../controllers/productController');

Route.post('/add-product', upload.array('images'),auth,add_product);

module.exports = Route;