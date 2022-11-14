const { response, request } = require('express');
const jwt = require ('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async( req = request, res = response, next) => {
    const token = req.header('x-token');
    console.log(token);

    if ( !token ){
        return res.status(401).json({
            msg: 'there is no token in the request'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
//esta funcion me sirve para verificar el JWT, si no es valido dispara la parte del catch.
       const user = await User.findById( uid ); //con esto leo el usuario.
       
       if ( !user){
        return res.status(401).json({
            msg:'Invalid Tokenn- User not exist DB'
       })
    }

    
//verificar si el UID tiene status en true.
        if ( !user.status){
            return res.status(401).json({
                msg:'Invalid Tokenn- User with False status'
            })
        }


       req.user = user;
       next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
    //llamo al next para que continue con lo que sigue

}

//el middlewares se dispara con tres argumentos, la request, response (para tener el tipado arrriba) y la funcion 
//next que tengo que llamar p indicarle a quien sea que esté ejutando el middlewear puede continnuar con el siguiente
//o con el controlador.

module.exports = {
    validarJWT
}