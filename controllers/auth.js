//Los controladores no son mas que funciones.
const { response, json } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require ('../helpers/google-verify');


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

const googleSignIn = async (req, res=response ) => {
    const {id_token} = req.body;

    try {
        const {email, name, picture} = await googleVerify( id_token );
        //voy a tener que verificar la referencia para saber si el correo ya existe en la base de datos.
        let user = await User.findOne({ email });

      //Verificar si el usuario existe en la base de datos
		if (!user) {
			//Si el usuario no existe lo tengo que crear
			//Aca creo un objeto con toda la data que le voy a pasar a ese nuevo user
			const data = {
				name,
				email,
				img : picture,
				role: "USER_ROLE",
				password: ":P",
				google: true
			}

			//Reescribimos usuario como un nuevo usuario pasandole de parametro el objeto de la data
			user = new User(data);
			//Guardamos ese usuario en la DB
			await user.save();
		}
        // Si el usario en DB esta negado, es falso 
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Talk to the Administrator, user blocked'
            });
        }

        //Generar el 
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });

    }catch (error){
        console.log(error);

       res.status(400).json({
            ok: false,
            msg: 'The token could not be verified'
        })
    }
}


module.exports = {
    login,
    googleSignIn
}