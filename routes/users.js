const { Router } = require('express');
const { check } = require('express-validator');

const {validateFields} = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validate-jwt');

const { isRoleValid, emailExists, existsUserForId } = require('../helpers/db-validators');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');
const router = require('./users');


const routes = Router();

//routes.get(route, middlewares, controllers); puede llevar tres paramatros, la ruta, el mid y el controlador.
//routes.post(route, middlewares, controllers); 
//routes.put(route, middlewares, controllers);
//routes.delete(route, middlewares, controllers);

routes.get('/', usersGet );
//middlewares []

routes.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsUserForId ),
    check('role').custom( isRoleValid ),
    validateFields
    ],usersPut ); //función que voy a llamar cuando tome esta ruta. 

routes.post('/',[ 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check ('role','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('email').custom( emailExists ),
    check('role').custom( isRoleValid ),
    validateFields ],usersPost); 


routes.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsUserForId ),
validateFields
],usersDelete);


module.exports = routes;