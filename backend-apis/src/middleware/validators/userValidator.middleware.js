const Joi = require('joi');

exports.validateAddUserToken = [

    (req,res,next)=>{
        const validationSchema = Joi.object({
            token : Joi.string().trim().required().messages({
                'string.base':'Token must be string',
                'string.empty':'Token is required',
                'any.required':'Token is required'
            }),

            user_id : Joi.number().required().messages({
                'number.base':'User id must be a number',
                'number.empty':'User id is required',
                'any.required':'User id is required'
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
]

exports.validateRegisterUser = [

    (req, res, next) => {
        const validationSchema = Joi.object({
            username: Joi.string().trim().required().messages({
                'string.base': 'Username must be a string',
                'string.empty': 'Username is required',
                'any.required': 'Username is required'
            }),
    
            name: Joi.string().trim().required().messages({
                'string.base': 'Full name must be a string',
                'string.empty': 'Full name is required',
                'any.required': 'Full name is required'
            }),
    
            mobile_no: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
                'string.base': 'Mobile number must be a string',
                'string.pattern.base': 'Mobile number must be 10 digits',
                'string.empty': 'Mobile number is required',
                'any.required': 'Mobile number is required'
            }),
    
    
            email: Joi.string().email().trim().required().messages({
                'string.base': 'Email must be a string',
                'string.email': 'Email must be a valid email',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
    
            password: Joi.string().min(8).required().messages({
                'string.base': 'Password must be a string',
                'string.min': 'Password must be at least 8 characters long',
                'string.empty': 'Password is required',
                'any.required': 'Password is required'
            })
        });
    
        const { error } = validationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    
        next();
    }
    

]

exports.validateDeleteUser = [

    (req, res, next) => {
        const validationSchema = Joi.object({
            id : Joi.number().required().messages({
                'number.base':'User id must be a number',
                'number.empty':'User id is required',
                'any.required':'User id is required'
            })
        });
    
        const { error } = validationSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    
        next();
    }
    

]