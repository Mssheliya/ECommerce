const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    category_id:{
        type:String,
        required:true
    },
    sub_category:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Sub_category', subcategorySchema);