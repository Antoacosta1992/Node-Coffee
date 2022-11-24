const { Router } = require('express');
const { search } = require('../controllers/search');

const routes = Router();


routes.get('/:colletion/:termino', search )




module.exports = routes;