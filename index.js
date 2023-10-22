const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/EComm').then((req,res)=> {
    console.log("We Are Connected Sir");
});
const port = process.env.port || 8000;
// const bodyparser = require("body-parser");


app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
// app.use(bodyparser.json);
// app.use(bodyparser.urlencoded({extended:true}));

//User Route
const user_Router = require('./routes/userRoute');
app.use('/',user_Router);

//Store Route
const store_Router = require('./routes/storeRoute');
app.use('/',store_Router);

//Category Route
const Category_Router = require('./routes/categoryRoute');
app.use('/',Category_Router);

//Sub_category Route
const sub_category = require('./routes/subcategoryRoute');
app.use('/',sub_category);

//Product Route
const product_Router = require('./routes/productRoute');
app.use('/',product_Router);

app.listen(port,()=>{
    console.log(`Your Server Running on PORT : ${port}`);
})