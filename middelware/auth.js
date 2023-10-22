const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = async(req,res,next)=> {
    const verifytoken = req.body.token || req.query.token || req.headers["authorization"];

    if(!verifytoken){
        res.status(200).send({Success:false,Msg:"A token required For Authentication"});
    }
    
    try {
        const decode = jwt.verify(verifytoken, config.secret_jwt);
        req.user = decode;

    } catch (error) {
        res.status(400).send({Success:false,Msg:"Invalid Token"});
    }
    return next()
}

module.exports = auth;