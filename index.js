const express = require('express');// nos sirve para crear el servidor
const sequelize = require('./configuracion/db');//nos sirve para conectar a la base de datos (la base que creamos en el archivo db.js)
const path = require('path');// nos sirve para manejar rutas de archivos
const app = express();


app.use(express.static('public'));
app.use('/fotos', express.static(path.join(__dirname, 'public/fotos')));
const port = process.env.PORT || 3000; // puerto en el que va a correr el servidor

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulario_generar_net.html'));
});



async function startServer() {
    try {
      await sequelize.authenticate();
      console.log('Conexión a PostgreSQL exitosa');
  
      app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Error al conectar a PostgreSQL:', error);
    }
  }
  startServer();    

const netRuta = require('./rutas/netRuta');
app.use('/', netRuta);
