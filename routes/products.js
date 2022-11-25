const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, isAdminRole, validateFields } = require('../middlewares');

const { createProduct,
        getProducts,
        getProduct,
        updateProduct, 
        deleteProduct } = require('../controllers/products');

const { existCategoryForId, existProductForId } = require('../helpers/db-validators');


const routes = Router();

/**
 * {{url}}/api/categories
 */

//  Obtener todas las categorias - publico
routes.get('/', getProducts );

// Obtener una categoria por id - publico
routes.get('/:id',[
    check('id', 'It is not a valid Mongo ID').isMongoId(),
    check('id').custom( existProductForId ),
    validateFields,
], getProduct );

// Crear categoria - privado - cualquier persona con un token válido
routes.post('/', [ 
    validarJWT,
    check('name','The name is required').not().isEmpty(),
    check('category','It is not a valid Mongo ID').isMongoId(),
    check('category').custom( existCategoryForId ),
    validateFields,
], createProduct );

// Actualizar - privado - cualquiera con token válido
routes.put('/:id',[
    validarJWT,
    check('category','No es un id de Mongo').isMongoId(),
    check('id').custom( existProductForId ),
    validateFields
], updateProduct );

// Borrar una categoria - Admin
routes.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'It is not a valid Mongo ID').isMongoId(),
    check('id').custom( existProductForId ),
    validateFields,
], deleteProduct);


module.exports = routes;