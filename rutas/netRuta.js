const express = require('express');
const multer = require('multer');
const router = express.Router();

const { storage } = require('../configuracion/cloudinary');
const upload = multer({ storage });

const CodigoNet = require('../modelos/codigoNet');
const { generarNet } = require('../controladores/controladorNet');

// Endpoint para generar NET
router.post('/generar-net', upload.single('foto'), generarNet);
router.get('/generar-net', generarNet);

// Endpoint paginado para historial-net
router.get('/historial-net', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await CodigoNet.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    const totalPaginas = Math.ceil(count / limit);

    res.json({
      lista: rows,
      totalPaginas
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
});