const express = require('express');
const Route = express.Router();
const auth = require('../middelware/auth');
const {add_category} = require('../controllers/categoryController');


Route.post('/add-category',auth, add_category);

module.exports = Route;