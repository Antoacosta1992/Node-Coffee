const Role = require('../models/role');
const {User, Category, Product} = require('../models');

const isRoleValid = async(role = '') => {

    const existsRole = await Role.findOne({ role });
    if ( !existsRole ) {
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
        throw new Error(`ID not exist ${ id }`);
    }
}

/**
 * Categories
 */
 const existCategoryForId = async( id ) => {

    // Verificar si el correo existe
    const existCategory = await Category.findById(id);
    if ( !existCategory ) {
        throw new Error(`ID not exist ${ id }`);
    }
 }

/**
 * Products
 */
 const existProductForId = async( id ) => {

    // Verificar si el correo existe
    const existProduct = await Producto.findById(id);
    if ( !existProduct ) {
        throw new Error(`ID not exist ${ id }`);
    }

}

module.exports = {
    isRoleValid,
    emailExists,
    existsUserForId,
    existCategoryForId,
    existProductForId
}

