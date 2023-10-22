const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Number:{
        type:String,
        required:true
    },
    Date_Of_Birth:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    CreatedAT:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('User', userSchema);