const express = require('express');// nos sirve para crear el servidor
const sequelize = require('./configuracion/db');//nos sirve para conectar a la base de datos (la base que creamos en el archivo db.js)
const path = require('path');// nos sirve para manejar rutas de archivos
const app = express();
const session = require ('express-session');// nos sirve para manejar sesiones  

app.use(express.urlencoded({ extended: true })); // para poder recibir datos del formulario
app.use(session({
  secret:'clave-secreta', // clave secreta para firmar la sesión
  resave: false, // no volver a guardar la sesión si no ha habido cambios
  saveUninitialized: false, // no guardar sesiones no inicializadas
}))

//usuarion que tiene permitido usar al pagina
const usuarios= [
  { username: 'tecsesus', password: 'jesushuox' },
  { username: 'tecpedro', password: 'pedromenchu' },
  { username: 'tecjulio', password: 'juliobarrios' },
  { username: 'tecjoseangel', password: 'joseangel' },
  { username: 'tecwalter', password: 'waltermerida' },
  { username: 'tecjorge', password: 'jorgegutierrez' },
  { username: 'tecjoseramirez', password: 'joseramirez' },
  { username: 'tecalex', password: 'alexlux' },
  { username: 'tecmarcos', password: 'marcoslopez' },
  { username: 'tecroman', password: 'romanxec' },
  { username: 'tecmelvin', password: 'melvinrojas' },
];

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  const autorizado = usuarios.find(user => user.username === username && user.password === password);
  if (autorizado) {
  req.session.usuario = username;
  res.redirect('/formulario_generar_net.html');

  }else{
    res.send('Usuario o contraseña incorrectos');
  }
});

// Middleware para proteger
function protegido(req, res, next) {
  if (req.session.usuario) return next();
  res.redirect('/login');
}

// Ruta protegida
app.get('/formulario_generar_net.html', protegido, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulario_generar_net.html'));
});

// Mostrar login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.use('/formulario_generar_net.html', protegido, express.static('public/formulario_generar_net.html'));

app.use('/fotos', express.static(path.join(__dirname, 'public/fotos')));
const port = process.env.PORT || 3000; // puerto en el que va a correr el servidor

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulario_generar_net.html'));
});



async function startServer() {
    try {
      await sequelize.authenticate();
      console.log('Conexión a PostgreSQL exitosa');

      await sequelize.sync(); // Sincronizar modelos con la base de datos
      console.log('Modelos sincronizados con la base de datos');
  
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
