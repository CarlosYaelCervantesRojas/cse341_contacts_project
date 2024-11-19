const { checkSchema , validationResult } = require('express-validator');

const contactSchema = checkSchema({
    firstName: {
        exists: {
            errorMessage: 'First name field is required.',
            bail: true
        },
        notEmpty: { 
            errorMessage: 'First name field cannot be empty.'
        },
        isString: {
            errorMessage: 'Invalid type on first name field.'
        }
    },
    lastName: {
        exists: {
            errorMessage: 'Last name field is required.',
            bail: true
        },
        notEmpty: { 
            errorMessage: 'Last name field cannot be empty.'
        },
        isString: {
            errorMessage: 'Invalid type on last name field.'
        }
    },
    email: {
        exists: {
            errorMessage: 'Email field is required.',
            bail: true
        },
        notEmpty: {
            errorMessage: 'Email field cannot be empty.',
        },
        isEmail: {
            errorMessage: 'Invalid email.',
        }
    },
    favoriteColor: {
        exists: {
            errorMessage: 'Favorite color field is required.',
            bail: true
        },
        notEmpty: { 
            errorMessage: 'Favorite color field cannot be empty.'
        },
        isString: {
            errorMessage: 'Invalid type on favorite color field.'
        }
    },
    birthday: {
        exists: {
            errorMessage: 'Birthday field is required.',
            bail: true
        },
        notEmpty: {
            errorMessage: 'Birthday field cannot be empty.',
        },
        isDate: {
            errorMessage: 'Invalid type on birthday field.',
        },
    }
})

function isValid(req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json(result.array());
        return
    }

    next();
}

module.exports = {
    contactSchema,
    isValid
};