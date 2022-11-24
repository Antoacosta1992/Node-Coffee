const validateFields = require('../middlewares/validate-fields');
const validarJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');

//El index creado va a tener la referencia de todos mis middleeares personalizados


module.exports = {
    ...validateFields,
    ...validarJWT,
    ...validateRoles,
}
