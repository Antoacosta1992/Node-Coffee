const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config.js');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:          '/api/auth',
            search:        '/api/search',
            categories:    '/api/categories',
            products:      '/api/products', 
            users:         'api/users',
            uploads:       'api/uploads',

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
    this.app.use (this.paths.search, require('../routes/search'));
    this.app.use( this.paths.categories, require('../routes/categories'));
    this.app.use( this.paths.products, require ('../routes/products'));
    this.app.use( this.paths.users, require('../routes/users'));
    this.app.use( this.paths.uploads, require('../routes/uploads'));
    

}

    listen() {
    this.app.listen( this.port, () => {
        console.log('Server running on port', this.port );
    });
}

}


module.exports = Server;