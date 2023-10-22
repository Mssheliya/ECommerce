const express = require('express');
const Route = express.Router();
const auth = require('../middelware/auth');
const {CreateSubCategory} = require('../controllers/subcategoryController');


Route.post('/add-sub-category',auth,CreateSubCategory);

module.exports = Route;
