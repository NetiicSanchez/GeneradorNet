const express = require('express');
const multer = require('multer');
const router = express.Router();

const { storage } = require('../configuracion/cloudinary');
const upload = multer({ storage });

const CodigoNet = require('../modelos/codigoNet');
const { generarNet, historialNet } = require('../controladores/controladorNet');

// Endpoint para generar NET
router.post('/generar-net', upload.single('foto'), generarNet);
router.get('/generar-net', generarNet);

// Endpoint paginado para historial-net
router.get('/historial-net', historialNet);

module.exports = router;