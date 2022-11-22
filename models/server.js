const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config.js');
const { routesUser } = require ('../routes/users.js');
const { reutesAuth } = require('../routes/auth.js')

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:          '/api/auth',
            categories:    '/api/categories',
            users:         'api/users',
        }


        //Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        
    }
     //creamos un metodo sincronico para la llamab dbconnection.
    async conectarDB() {
        await dbConnection();
    }
 
    middlewares() {
        
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );
    }

        
    //Acá se llama a la ruta constructor y los callbacks del routes.
    routes() {
    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.categories, require('../routes/categories'));
    this.app.use( this.paths.users, require('../routes/users'));

}

    listen() {
    this.app.listen( this.port, () => {
        console.log('Server running on port', this.port );
    });
}

}


module.exports = Server;