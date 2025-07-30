const CodigoNet = require('../modelos/codigoNet');
const { cloudinary } = require('../configuracion/cloudinary');
const fs = require('fs');

function siguienteCodigo(numActual) {
  const numero = parseInt(numActual.replace("NET", "")) || 895;
  return `NET${numero + 1}`;
}

const generarNet = async (req, res) => {
  try {
    // Extraer datos del formulario
    const { nombre_cliente, coordenadas } = req.body;

    if (!nombre_cliente || !coordenadas || !req.file) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Obtener último código
    const ultimo = await CodigoNet.findOne({ order: [['idcodigonet', 'DESC']] });
    const nuevoCodigo = siguienteCodigo(ultimo?.codigo_net || "NET13457");

    // Subir imagen a Cloudinary con el nombre del código NET
    let fotoUrl = '';
    if (req.file && req.file.path) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        public_id: `fotosNET/${nuevoCodigo}`,
        overwrite: true,
        folder: 'fotosNET'
      });
      fotoUrl = uploadResult.secure_url;

      // Elimina el archivo temporal después de subirlo
      fs.unlink(req.file.path, () => {});
    }

    // Guardar en la base de datos
    const nuevo = await CodigoNet.create({
      codigo_net: nuevoCodigo,
      nombre_cliente,
      coordenadas,
      foto: fotoUrl,
      enviado_por: req.session.usuario || 'desconocido'
    });

    res.json({
      mensaje: 'Código NET generado',
      codigo: nuevo.codigo_net,
      enlace: fotoUrl,
      fecha: nuevo.fechagenerada
    });

  } catch (error) {
    console.error('Error generando NET:', error);
    res.status(500).json({ error: 'Error generando el código NET' });
  }
};

const historialNet = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await CodigoNet.findAndCountAll({
      order: [['idcodigonet', 'DESC']],
      limit,
      offset
    });

    const totalPaginas = Math.ceil(count / limit);

    res.json({
      lista: rows,
      totalPaginas
    });
  } catch (error) {
    console.error('Error obteniendo historial:', error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

module.exports = { generarNet, historialNet };