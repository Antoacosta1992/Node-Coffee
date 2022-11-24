const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { login, googleSignIn } = require('../controllers/auth');


const routes = Router();

routes.post('/login',[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields //para que aparezca el mensaje.
] ,login );
// defino unicamente la ruta post al login

routes.post('/google',[
    check('id_token', 'ID Token is required').not().isEmpty(),
    validateFields
],googleSignIn);

module.exports = routes;