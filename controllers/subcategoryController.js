const sub_categoryModel = require('../models/subcategoryModel');

const CreateSubCategory = async(req,res)=> {
    
    try {

        const check_sub = await sub_categoryModel.find({category_id:req.body.category_id});
        if(check_sub.length > 0){
            let checking = false;
            for(let i=0;i<check_sub.length;i++){
                if(check_sub[i]['sub_category'].toLowerCase()===req.body.sub_category.toLowerCase()){
                    checking = true;
                    break;
                }
            }
            if(checking === false){
                const subcategory = new sub_categoryModel({
                    category_id:req.body.category_id,
                    sub_category:req.body.sub_category,
                });
                const sub_cat_data = await subcategory.save();
                console.log(sub_cat_data);
                res.status(200).send({Success:true,Msg:"sub_categories",data:sub_cat_data});
            }
            else{
                res.status(200).send({Success:false,Msg:`This sub_categories ${req.body.sub_category} is already Exist`});
            }

        }
        else{
            const subcategory = new sub_categoryModel({
                category_id:req.body.category_id,
                sub_category:req.body.sub_category,
            });
            const sub_cat_data = await subcategory.save();
            console.log(sub_cat_data);
            res.status(200).send({Success:true,Msg:"sub_categories",data:sub_cat_data});
        }
        
    } catch (error) {
        res.status(400).send({Success:false,Msg:error.message});
    }
}

module.exports = {
    CreateSubCategory
};