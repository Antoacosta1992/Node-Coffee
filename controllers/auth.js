//Los controladores no son mas que funciones.

const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const {generarJWT} = require('../helpers/generar-jwt');


const login = async(req, res) =>{
     
    const {email, password} = req.body;
    
    try {
        //VERIFICAR SI EL EMAIL EXISTE - 
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct -- email' //dependiendo de la base de datos si el email es false o true
            })
        }
        //SI EL USUARIO ESTÁ ACTIVO - verificamos que no haya sido borrado
        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password are not correct -- status: false'
            })
        }
        //VERIFICAR LA CONTRASEÑA - comparamos contraseñas y mensaje
        const validPassword = bcryptjs.compareSync(password, user.password);
        //con esto estamos comparando la password que tenemos del requ y la comparamos con la que esta en basedate.
        if (!validPassword) {
         return res.status(400).json({
            msg: 'User / Password are not correct -- password'
         });    
    }
        //POR ULTIMO, GENERAR EL JWT  
        const token = await generarJWT(user.id);

       res.json({
           user,
           token
        });

    } catch (err){
        console.log(err);
        res.status(500).json({
            msg: 'talk to the administrator'
        });
    }
//el catch es para que la aplicacion no se caiga.
//status(500) seria un internal server error.
}

module.exports = {
    login
}