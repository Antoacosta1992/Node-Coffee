const { validationResult } = require('express-validator');


const validateFields = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

//los middlewares se ejecuntan uno después del otro.

module.exports = {
    validateFields
}
