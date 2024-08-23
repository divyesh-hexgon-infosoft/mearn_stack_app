const {
    TokenMissingException,
    TokenVerificationException,
    UnauthorizedException,
    TokenExpiredException
} = require('../utils/exceptions/auth.exception');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { Config } = require('../config/config');

const auth = () => {
    return async function (req, res, next) {
        try {

            console.log("token for authorization : ",req.headers);
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new TokenMissingException();
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = Config.SECRET_JWT;

            // Verify Token
            console.log("this middleware for token : ",token,secretKey);
            const decoded = jwt.verify(token, secretKey);
            console.log("this is decode token : ",decoded)
            const user = await UserModel.findOne({ id: decoded.user_id });

            if (!user) {
                throw new TokenVerificationException();
            }

            // check if the current user is the owner user
            // const ownerAuthorized = req.params.id == user.user_id; //cant update self
            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            // if (/*! ownerAuthorized || */(roles.length && !roles.includes(user.user_type))) {
            //     throw new UnauthorizedException();
            // }
            // if the user has permissions
            console.log("tokens : ",user.auth_token,token);
            if(user.auth_token != token){
                throw new TokenVerificationException();
            }

            // compareCurrectimeAndLogoutTime(user.logout_time);

            // function compareCurrectimeAndLogoutTime(logout_time){
            //     const now = new Date();
            //     let hours = String(now.getHours()).padStart(2, '0');
            //     let minutes = String(now.getMinutes()).padStart(2, '0') ;
            //     let currentTime = `${hours}:${minutes}:00`;

            //     const current_date_time = new Date(`1970-01-01T${currentTime}Z`);
            //     const logout_date_time = new Date(`1970-01-01T${logout_time}Z`);

            //     if(current_date_time>logout_date_time){
            //         throw new TokenExpiredException();
            //     }

            // }

            req.currentUser = user;

            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }


    };
}; 


module.exports = auth;

 