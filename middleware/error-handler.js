const httperror = require('http-errors');

const errorHandlerMiddleware = async(err,req,res,next)=>{
    res.status(err.status||500);
    res.render('index',{error:err.message});
}

module.exports = errorHandlerMiddleware;