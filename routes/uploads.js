const { Router } = require('express');
const { check } = require('express-validator');

const { validateField, validateFileUpload } = require('../middlewares');
const {  uploadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');


const router = Router();


router.post( '/', validateFileUpload, uploadFile );

router.put('/:collection/:id', [
    validateFileUpload,
    check('id','The id must be from mongo').isMongoId(),
    check('collection').custom( c =>  allowedCollections( c, ['users','products'] ) ),
    validateField
], updateImageCloudinary )
// ], actualizarImagen )

router.get('/:collection/:id', [
    check('id','The id must be from mongo').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users','products'] ) ),
    validateField
], showImage  )



module.exports = router;


//Si quiero crear un nuevo recuerso en mi servidor (excel,imagen,etc) voy a utilizar el 
//post si lo quiero actulizar el put.
