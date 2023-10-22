const userModel = require('../models/userModel');
const storeModel = require('../models/storeModel');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:function (req,file,cb){
        const dstn = path.join(__dirname,'../public/storeImages');
        cb(null, dstn);
    },
    filename:function (req,file,cb){
        const name = Date.now()+ "-" +file.originalname;
        cb(null, name);
    }
    
})

const upload = multer({storage:storage});

const create_Store = async(req,res)=>{
    try {
        const userData = await userModel.findOne({_id:req.body.vendor_id});
        // const role = userData.Role;
        if(userData){
            if(userData.Role == 'Vendor'){
                if(!req.body.longitude || !req.body.latitude){
                    res.status(200).send({Success:false,Msg:"Please longitude or latitude of store location is required"});
                }
                else{
                    const vendorData = await storeModel.findOne({vendor_id:req.body.vendor_id});
                    if(vendorData){
                        res.status(200).send({Success:false,Msg:"Vendor has already Add store"});
                    }
                    else{
                        const store = new storeModel({
                            vendor_id:req.body.vendor_id,
                            store_name:req.body.store_name,
                            store_logo:req.file.filename,
                            business_email:req.body.business_email,
                            address:req.body.address,
                            pin:req.body.pin,
                            location:{
                                type:"Point",
                                coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
                            }
                        });
                        const storeData = await store.save();
                        res.status(200).send({Success:true,Msg:"Store Data",Data:storeData});
                    }
                }
            }
            else{
                res.status(200).send({Success:false,Msg:"Sorry User not allow to add Store"});
            }
        }
        else{
            res.status(200).send({Success:false,Msg:"vendor_id does not Exists"});
        }

    } catch (error) {
        res.status(400).send({msg:error.message});
    }

}

module.exports = {
    create_Store,
    upload,
};