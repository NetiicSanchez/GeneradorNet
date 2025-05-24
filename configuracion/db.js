    // codigo para la conexión a la base de datos

    const {Sequelize} = require('sequelize');


    const sequelize= new Sequelize('postgres', 'postgres', 'codigonet', { // nombre de la base de datos, usuario y contraseña
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        logging: false,
        timezone: '-06:00', // Ajusta la zona horaria según tu ubicación

    });
    module.exports= sequelize; 
    // exportamos la conexión a la base de datos para poder usarla en otros archivos 
    // (sequelize es el nombre de la variable que contiene la conexión a la base de datos)