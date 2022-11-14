const jwt = require("jsonwebtoken");

//Funcion para generar token
const generarJWT = async (uid = "") => {
  //Le mandamis el UID para que no tenga mas informacion el JWT
  return new Promise((resolve, reject) => {
    const payload = { uid };
	
  //Generamos el JWT y se crean 4 phar (payload, secreteorprivatekey que es una llave secreta para firmar el token y esta guandado como variable de entrono, el tercero son las opciones como por ejemplo tiempo de expiracion, el cuarto es el callback, para disparar en caso de exito o error.
 //voy a verificar el uid del usuario antes de tomar cualquier decision.
    jwt.sign( payload, process.env.SECRETORPRIVATEKEY,
      {expiresIn: "50d",},
      (err, token) => {

        if (err) {
          console.log(err);
          reject("Cannot generate TOKEN");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };