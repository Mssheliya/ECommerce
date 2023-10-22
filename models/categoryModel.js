const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

module.exports = mongoose.model('Category', categorySchema);