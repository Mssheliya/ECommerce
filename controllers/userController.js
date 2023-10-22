const userModel = require("../models/userModel");
const multer = require("multer");
const path = require("path");
const bcryptjs = require("bcryptjs");
const config = require('../config/config');
const jwt = require('jsonwebtoken');


//Set Multer Storage For images 
const storage = multer.diskStorage({
    destination:function (req, file, cb){
        const dstn = path.join(__dirname,'../public/userImages');
        cb(null, dstn)
    },
    filename:function (req, file, cb){
        const name = Date.now()+ "-" +file.originalname;
        cb(null, name)
    }
})
const upload = multer({storage:storage});

//Crete token Method
const create_token = async(id)=> {
    try {
        const token = await jwt.sign({_id:id}, config.secret_jwt);
        return token;

    } catch (error) {
        console.log(error);
    }
}

//bcrypt password for secure password method
const securepassword = async(password)=>{
    try {
        const passwordhash = await bcryptjs.hash(password,10);
        return passwordhash;
        
    } catch (error) {
        // res.status(400).send({msg:error.message});
        console.log(error);
    }
}

//Register method
const register_user = async (req, res)=> {
    try {

        // const image_upload = upload.single("Image");
        // image_upload(req,res, function(err){
        //     if(err){
        //         res.status(400).send({msg:err.message});
        //     }
        // })
        // console.log(req.body);
        const spassword = await securepassword(req.body.Password);
        // const image = null;
        // if(req.file !== undefined){
        //     image = req.file.filename;
        // }
        const user = new userModel({
            Name:req.body.Name,
            Email:req.body.Email,
            Password:spassword,
            Number:req.body.Number,
            Date_Of_Birth:req.body.Date_Of_Birth,
            Gender:req.body.Gender,
            Role:req.body.Role,
            Image:req.file.filename,
        })
        const email = await userModel.findOne({Email:req.body.Email});
        if(email){
            res.status(404).send({
                Success:false,
                msg:"This Email is Already Exist"
            })
        }
        else{
            const userData = await user.save();
            res.status(200).send({
                Success:true,
                Data:userData,
            });
        }

    } catch (error) {
        res.status(500).send({msg:error.message});
    }
}

//Login method
const user_login = async(req,res)=> {
    try {
        const email = req.body.Email;
        const password = req.body.Password;
        // console.log(email,password);
        const userData = await userModel.findOne({Email:email})
        if(userData){
            const passwordMatch = await bcryptjs.compare(password,userData.Password);
            if(passwordMatch){
                const tokenData = await create_token(userData._id);
                const userResult = {
                    _id:userData._id,
                    name:userData.Name,
                    email:userData.Email,
                    password:userData.Password,
                    mobile:userData.Number,
                    dob:userData.Date_Of_Birth,
                    gender:userData.Gender,
                    role:userData.Role,
                    image:userData.Image,
                    createdAt:userData.CreatedAT,
                    token:tokenData
                }
                
                const responce = {
                    Success:true,
                    Msg:"Your Data",
                    Data:userResult,
                }
                res.status(200).send(responce);
                
            }
            else{
                res.status(200).send({
                    Success:true,
                    msg:"Your login details are incorrect"
                }) 
            }
        }
        else{
            res.status(200).send({
                Success:true,
                msg:"Your login details are incorrect"
            })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

//Update Password Method
const update_password = async(req,res)=> {
    try {
        const email = req.body.Email;
        const password = req.body.Password;

        const userData = await userModel.findOne({Email:email});
        if(userData){
            const newpassword = await securepassword(password);
            
            const data = await userModel.updateOne(
                    { Email: email },
                    {
                        $set: {
                            Password: newpassword
                        }
                    }
            )
            res.status(200).send({
                Success:true,
                Msg:"your password has been updated"
            })
        }
        else{
            res.status(200).send({
                Success:false,
                Msg:"Your email is invalid"
            })
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    register_user,
    user_login,
    upload,
    update_password
};