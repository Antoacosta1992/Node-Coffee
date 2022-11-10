const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');


const routes = Router();

routes.post('/login',[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields //para que aparezca el mensaje.

] ,login );
// defino unicamente la ruta post al login

module.exports = routes;