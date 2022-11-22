const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    user:{
        type: Schema.Types.ObjectId, //otro objeto que vamos a tener en Mongo
        ref: 'User',
        require: true
        //cuando creo una categoria tengo que saber cuál usuario fue el que creó la catecoría.
    }
});


module.exports = model( 'Category', CategorySchema );
