const { Router } = require('express');
const { check } = require('express-validator');

//const {validateFields} = require('../middlewares/validate-fields');
//const { validarJWT } = require('../middlewares/validate-jwt');
//const {isAdminRole, haveRole} = require('../middlewares/validate-roles');

//Un Mdw para validar campos, otro para validar el token, otro para verificar si es rol admin u otro para validar
//si tiene un rol en especifico.
const {
    validateFields, 
    validarJWT, 
    isAdminRole, 
    haveRole
} = require('../middlewares');


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
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( existsUserForId ),
    check('role').custom( isRoleValid ),
    validateFields
    ],usersPut ); //función que voy a llamar cuando tome esta ruta. 

routes.post('/',[ 
    check('name', 'The name in required').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'the email is not válid').isEmail(),
    check ('role','Is not a role valid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('email').custom( emailExists ),
    check('role').custom( isRoleValid ),
    validateFields ],usersPost); 


routes.delete('/:id',[
    validarJWT,
    //isAdminRole,
    //ESTE isAdminRole fuerza a que el usuario sea administrador.
    haveRole('USER_ROLE', 'OTHER_ROLE'),
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( existsUserForId ),
validateFields
],usersDelete);


module.exports = routes;