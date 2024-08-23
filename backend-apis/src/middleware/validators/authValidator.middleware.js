const { body } = require('express-validator');
const { OTPRegex } = require('../../utils/common.utils');
// const EmailValidator = require('deep-email-validator');
const Joi = require('joi');

exports.forgotPWSchema = [

    (req,res,next)=>{
        const validationSchema = Joi.object({
            email: Joi.string().trim().required().email({ minDomainSegments: 2 })
                .messages({
                    'string.base': 'Email must be a string',
                    'string.empty': 'Email is required',
                    'string.email': 'Must be a valid email',
                    'any.custom': 'Email unrecognized',
                    'any.required': 'Email is required',
                })
        });

        const { error } = validationSchema.validate(req.body);
        if(error){
            next(error);
        }
        else{
            next();
        }
    }
];

exports.changePWSchema = [
    body('email')
        .trim()
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('password')
        .trim()
        .exists()
        .withMessage('Password field is required')
        .notEmpty()
        .withMessage('Password must be filled'),
    body('new_password')
        .trim()
        .exists()
        .withMessage('New password field is required')
        .notEmpty()
        .withMessage('New password must be filled')
        .custom((value, { req }) => value !== req.body.password)
        .withMessage('New password can\'t be the same as the old password')
];

exports.resetPWSchema = [
    body('email')
        .trim()
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];

exports.verifyOTPSchema = [

    (req,res,next)=>{
        const validationSchema = Joi.object({
            email: Joi.string().trim().required().email({ minDomainSegments: 2 })
                .messages({
                    'string.base': 'Email must be a string',
                    'string.empty': 'Email is required',
                    'string.email': 'Must be a valid email',
                    'any.custom': 'Email unrecognized',
                    'any.required': 'Email is required',
                }),
            OTP : Joi.string().trim().required()
        });

        const { error } = validationSchema.validate(req.body);
        if(error){
            next(error);
        }
        else{
            next();
        }
    }

];

exports.validateLogin = [
    (req,res,next)=>{
        const validationSchema = Joi.object({
            email: Joi.string().trim().required(),
            password: Joi.string().trim().required().min(1)
            .messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required',
                'any.required': 'Password is required',
                'string.min': 'Password must be filled',
            }),
            latitude: Joi.number()
            .min(-90)
            .max(90)
            .required()
            .messages({
              'number.base': 'Latitude must be a number',
              'number.min': 'Latitude must be greater than or equal to -90',
              'number.max': 'Latitude must be less than or equal to 90',
              'any.required': 'Latitude is required'
            }),
          longitude: Joi.number()
            .min(-180)
            .max(180)
            .required()
            .messages({
              'number.base': 'Longitude must be a number',
              'number.min': 'Longitude must be greater than or equal to -180',
              'number.max': 'Longitude must be less than or equal to 180',
              'any.required': 'Longitude is required'
            })
        });

        const { error } = validationSchema.validate(req.body);
        if(error){
            next(error);
        }
        else{
            next();
        }
    }
];

exports.validateRefresh = [
    body('email')
        .trim()
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled'),
    body('oldToken')
        .trim()
        .exists()
        .withMessage('Old token is required for refreshing')
        .isJWT()
        .withMessage('Invalid token format')
];