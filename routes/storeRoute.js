const express = require('express');
const Route = express.Router();
const auth = require('../middelware/auth');
const {create_Store, upload} = require('../controllers/storeController');

Route.post('/create-store',auth,upload.single('store_logo'),create_Store);

module.exports = Route;