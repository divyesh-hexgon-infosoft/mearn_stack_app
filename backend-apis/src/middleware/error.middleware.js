const { Config } = require('../config/config');
const { InternalServerException } = require('../utils/exceptions/api.exception');
const { TokenVerificationException, TokenExpiredException } = require('../utils/exceptions/auth.exception');
const {InvalidPropertiesException} = require('../utils/exceptions/validation.exception');
const {CustomError} = require('../utils/exceptions/custom.exception')
function errorMiddleware (err, req, res, next) {
    // TODO: Add better code checking for JWT errors
    console.log("this is error middleware : ",err);
    if (err.status === 500 || !err.message) {
        if (!err.isOperational) err = new InternalServerException(`Internal server error : ${err.message}`);
    } else if (err.name === "JsonWebTokenError") err = new TokenVerificationException();
    else if (err.message === "jwt expired") err = new TokenExpiredException();
    else if (err.name === "ValidationError") err = new InvalidPropertiesException(err.message);
    else if(!err.status)err = new CustomError(err.message);

    let { message, code, error, status, data, stack } = err;

    if (Config.NODE_ENV === "dev"){
        console.log(`[Exception] ${error}, [Code] ${code}`);
        console.log(`[Error] ${message}`);
        console.log(`[Stack] ${stack}`);
    }

    const body = {
        success: "0",
        error,
        code,
        message,
        ...(data) && data
    };

    res.status(status).send({body}); 
}

module.exports = errorMiddleware;
