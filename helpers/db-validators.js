const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(rol = '') => {

    const existsRol = await Role.findOne({ rol });
    if ( !existsRol ) {
        throw new Error(`The role ${ role } is not registered in the DB`);
    }
}

const emailExists = async( email = '' ) => {

    // Verificar si el correo existe
    const existsEmail = await User.findOne({ email });
    if ( existsEmail ) {
        throw new Error(`This email: ${ email },is already registered`);
    }
}

const existsUserForId = async( id ) => {

    // Verificar si el correo existe
    const existsUser = await User.findById(id);
    if ( !existsUser ) {
        throw new Error(`El id not exists ${ id }`);
    }
}



module.exports = {
    isRoleValid,
    emailExists,
    existsUserForId
}

