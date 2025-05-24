const {DataTypes} = require('sequelize');
const sequelize = require('../configuracion/db');// importamos la conexión a la base de datos

const Codigonet = sequelize.define('codigo_net', {
    idcodigonet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   codigo_net: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fechaGenerada: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'fechagenerada'
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre_cliente'
    },
    coordenadas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    }

    
}, {
    tableName: 'codigo_net', // Nombre de la tabla en la base de datos
    timestamps: false // Desactivar los campos createdAt y updatedAt
})

module.exports = Codigonet; // exportamos el modelo para poder usarlo en otros archivos