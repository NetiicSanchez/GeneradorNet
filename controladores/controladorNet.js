const CodigoNet = require('../modelos/codigoNet');

function siguienteCodigo(numActual) {
  const numero = parseInt(numActual.replace("NET", "")) || 895;
  return `NET${numero + 1}`;
}

const generarNet = async (req, res) => {
  try {
    // Extraer datos del formulario
    const { nombre_cliente, coordenadas } = req.body;
    const foto = req.file ? `http://localhost:3000/fotos/${req.file.filename}` : null;


    if (!nombre_cliente || !coordenadas || !foto) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

   // Crear el enlace completo de la imagen
const enlaceFoto = req.file?.path;;

    // Obtener último código
    const ultimo = await CodigoNet.findOne({ order: [['idcodigonet', 'DESC']] });
    const nuevoCodigo = siguienteCodigo(ultimo?.codigo_net || "NET895");

    // Guardar en la base de datos
    const nuevo = await CodigoNet.create({
      codigo_net: nuevoCodigo,
      nombre_cliente,
      coordenadas,
      foto: enlaceFoto
    });

    res.json({
      mensaje: 'Código NET generado',
      codigo: nuevo.codigo_net,
      enlace: enlaceFoto,
      fecha: nuevo.fechagenerada
    });

  } catch (error) {
    console.error('Error generando NET:', error);
    res.status(500).json({ error: 'Error generando el código NET' });
  }
};

const historialNet = async (req, res) => {
  try {
    const datos = await CodigoNet.findAll({ order: [['idcodigonet', 'DESC']] });
    res.json(datos);
  } catch (error) {
    console.error('Error obteniendo historial:', error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

module.exports = { generarNet, historialNet };
