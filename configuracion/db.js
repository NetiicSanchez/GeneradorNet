    // codigo para la conexión a la base de datos
    const { Sequelize } = require('sequelize');
    const {Sequelize} =new Sequelize (process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Esto es necesario para Heroku
            rejectUnauthorized: false // Esto es necesario para Heroku
        }
    },
     logging: false, // Desactivar los logs de SQL
     timezone:'-06:00' // Ajustar la zona horaria 
    });

  
    // exportamos la conexión a la base de datos para poder usarla en otros archivos 
    // (sequelize es el nombre de la variable que contiene la conexión a la base de datos)