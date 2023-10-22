const categoryModel = require('../models/categoryModel');

const add_category = async(req,res)=> {
    
    try {

        const category_data = await categoryModel.find({});
        if(category_data.length > 0){

            let checking = false;
            for(let i=0;i<category_data.length;i++){
                if(category_data[i]['category'].toLowerCase() === req.body.category.toLowerCase()){
                    checking = true;
                    break;
                }
            }
            
            if( checking == false){
                const category = new categoryModel({
                    category:req.body.category,
                });
                const data = await category.save();
                res.status(200).send({Success:true,Data:data});
            }
            else{
                res.status(200).send({Success:false,Msg:`This category ${req.body.category} is already Exist`});
            }
        }
        else{
            const category = new categoryModel({
                category:req.body.category,
            });
            const data = await category.save();
            res.status(200).send({Success:true,Data:data});
        }

    } catch (error) {
        
        res.status(400).send({Success:false,Msg:error.message});

    }
}

module.exports = {
    add_category,
}