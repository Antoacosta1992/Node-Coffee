const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');


const routes = Router();
/**
 * {{localhost:8081}}/api/categories
 */

//Obtener todas las categories = public.
routes.get('/', (req, res)=>{
    res.json('get');
});

//Obtener una categoría en particular por ID.
routes.get('/:id', (req, res)=>{
    res.json('get - id');
});

//Se va a a encargar de CREAR una nueva categoría.(privado, cualquier persona con token válido)
routes.post('/', (req, res)=>{
    res.json('post');
});

//Para ACTUALIZAR (privado, cualquier persona con token válido)
routes.put('/:id', (req, res)=>{
    res.json('put');
});

//Delete categorie, sólo si es un ADMIN
routes.delete('/:id', (req, res)=>{
    res.json('delete');
});


module.exports = routes;
