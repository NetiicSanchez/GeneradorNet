const express = require('express');
const multer = require('multer');
const router = express.Router();

const { storage } = require('../configuracion/cloudinary');
const upload = multer({ storage });

const { generarNet, historialNet } = require('../controladores/controladorNet');

router.post('/generar-net', upload.single('foto'), generarNet);// el nombre del campo en el formulario es 'foto'
router.get('/generar-net', generarNet);
router.get('/historial-net', historialNet);

module.exports = router;
