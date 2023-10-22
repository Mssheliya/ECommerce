const productModel = require('../models/productModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const dstn = path.join(__dirname,'../public/productImages');
        cb(null, dstn);
    },
    filename:function(req,file,cb){
        const name = Date.now()+ "-" +file.originalname;
        cb(null, name); 
    }
})

const upload = multer({storage:storage});

const add_product = async(req,res)=>{

    try {
        const arrImages = [];
        for(let i=0; i< req.files.length; i++){
            arrImages[i] = req.files[i].filename;
        }

        const product = new productModel({
            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id,
            category_id: req.body.category_id,
            sub_cat_id: req.body.sub_cat_id,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            discription: req.body.discription,
            images: arrImages
        })
        const productData = await product.save();
        res.status(200).send({Success:true, Msg:"Product Data", Data:productData});
        
    } catch (error) {
        res.status(400).send({Success:false,Msg:error.message});
    }
}

module.exports = {
    add_product,
    upload,
}