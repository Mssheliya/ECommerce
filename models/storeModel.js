const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    store_name:{
        type:String,
        required:true
    },
    store_logo:{
        type:String,
        default:null,
    },
    business_email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    location:{
        type:{type:String,required:true},
        coordinates:[]
    }
});

storeSchema.index({location:"2dsphere"});
module.exports = mongoose.model('Store', storeSchema);