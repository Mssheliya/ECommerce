const express = require("express");
const Route = express.Router();
const auth = require('../middelware/auth');
const {
    register_user, 
    upload, 
    user_login, 
    update_password

} = require("../controllers/userController");
// const bodyParser = require("body-parser");

// Route.use(bodyParser.json());
// Route.use(bodyParser.urlencoded({extended:true}));

Route.post('/register',upload.single('Image'),register_user); //Api for register User
Route.post('/login', user_login);  //Api for user login
Route.get('/test',auth,function(req,res){

    res.status(200).send({Success:true,Msg:"Authenticated"});

}); //Api test authentication
Route.post('/update-password',auth, update_password); //Api for update password

module.exports = Route;