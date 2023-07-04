const createHttpError = require('http-errors');

const notFound = (req,res,next) =>{
    next(createHttpError.notFound);
}

module.exports = notFound;