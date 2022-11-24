const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validateFields, isAdminRole } = require('../middlewares');

const { createCategory,
        getCategories,
        getCategory,
        updateCategory, 
        deleteCategory } = require('../controllers/categories');

const { existCategoryForId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categories
 */

//  Obtener todas las categorias - publico
router.get('/', getCategories );

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'It is not a valid Mongo ID').isMongoId(),
    check('id').custom( existCategoryForId ),
    validateFields,
], getCategory );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('name','The name in required').not().isEmpty(),
    validateFields
], createCategory );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('name','The name in required').not().isEmpty(),
    check('id').custom( existCategoryForId ),
    validateFields
], updateCategory );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'It is not a valid Mongo ID.').isMongoId(),
    check('id').custom( existCategoryForId ),
    validateFields,
],deleteCategory);



module.exports = router;