const express = require('express');// nos sirve para crear el servidor
const sequelize = require('./configuracion/db');//nos sirve para conectar a la base de datos (la base que creamos en el archivo db.js)
const path = require('path');// nos sirve para manejar rutas de archivos
const app = express();
const session = require ('express-session');// nos sirve para manejar sesiones  
const CodigoNet = require('./modelos/codigoNet');
app.use(express.urlencoded({ extended: true })); // para poder recibir datos del formulario


app.use(session({
  secret:'clave-secreta', // clave secreta para firmar la sesión
  resave: false, // no volver a guardar la sesión si no ha habido cambios
  saveUninitialized: false, // no guardar sesiones no inicializadas
  cookie:{
    maxAge:20 * 60 * 1000 // tiempo de expiración de la sesión en milisegundos (20 minutos)
  }

}))

//usuarion que tiene permitido usar al pagina
const usuarios= [
  { username: 'ADMIN', password: 'admin2025',rol:'tecnico' },
  { username: 'chuzhuox@nettic', password: 'jesushuox',rol:'tecnico' },
  { username: 'pedro.m@nettic', password: 'pedromenchu', rol:'tecnico' },
  { username: 'j.cesaraquino@nettic', password: 'juliobarrios' , rol:'tecnico' },
  { username: 'daniloangel@nettic', password: 'joseangel' , rol:'tecnico' },
  { username: 'wmerida@nettic', password: 'waltermerida' , rol:'tecnico' },
  { username: 'hroman@nettic', password: 'romanxec' , rol:'tecnico' },
  { username: 'melvirojas@nettic', password: 'melvinrojas' , rol:'tecnico' },
  { username: 'jorgegutierrez@nettic', password: 'jorgegutierrez' , rol:'tecnico' },
  { username: 'oscars@nettic', password: 'oscarsomoza' , rol:'tecnico' },
  { username: 'a.lux@nettic', password: 'alexlux' , rol:'tecnico' },
  { username: 'marcoslopez@nettic', password: 'marcoslopez' , rol:'tecnico' },
  { username: 'j.pelico@nettic', password: 'supjuanpelico' , rol:'tecnico' },
  {username: 'mariobernabe@nettic', password: 'mariobernabe', rol:'tecnico' },
  { username: 'despmarielos', password: 'marielos211' , rol:'despacho' },
  { username: 'despnery', password: 'nerygomez', rol:'despacho' },
  { username: 'jcpelico', password: 'juanpelico', rol:'despacho' },
  
];

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  const autorizado = usuarios.find(user => user.username === username && user.password === password);

  if (autorizado) {
  req.session.usuario = autorizado.username;
  req.session.rol = autorizado.rol; // Guardar el rol del usuario en la sesión
  if (autorizado.rol === 'tecnico') {
    res.redirect('/formulario_generar_net.html'); // Redirigir a la página del técnico
  } else if (autorizado.rol === 'despacho') {
    res.redirect('/historial_despacho.html'); // Redirigir a la página del despacho

  }else{
    res.send('Usuario o contraseña incorrectos');
  }
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

//ruta protegida para el historial de despacho
app.get('/historial_despacho.html', protegido, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'historial_despacho.html'));
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

app.use(express.static('public'));
app.use('/fotos', express.static(path.join(__dirname, 'public/fotos')));
const port = process.env.PORT || 3000; // puerto en el que va a correr el servidor

app.get('/',protegido, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulario_generar_net.html'));
});

app.get('/clientes-disponibles', protegido, async (req, res) => {
  const todos = [

    "NIVIAN AMANDA LOPEZ VASQUEZ DE HERNANDEZ",
    "ERICK ALFREDO LOPEZ MOH",
    "DULCE GABRIELA MONROY CAMEY",
    "ENMA DAMARIS CABRERA SALES",
    "EDWARD VINICIO HERNANDEZ PELAEZ",
    "CESAR EDUARDO CABRERA LOPEZ",
    "CINDY PAOLA IXCOT DE LEON DE MIRANDA",
    "LEYSER ESTUARDO POS CARRILLO",
    "CHARY ALEJANDRA GUZMAN IXCOY",
    "ISRAEL BERNABE MENDEZ MARTINEZ",
    "IRMA ELIZABETH CHOCHOM PACAY",
    "NIVIAN AMANDA LOPEZ VASQUEZ DE HERNANDEZ1",


  ];

  const usados = await CodigoNet.findAll({ attributes: ['nombre_cliente'] });
  const usadosSet = new Set(usados.map(c => c.nombre_cliente));
  const disponibles = todos.filter(nombre => !usadosSet.has(nombre));
  res.json(disponibles);
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
app.use( netRuta);