const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dlfcuvze9',
  api_key: '123387595313818',
  api_secret: 'bvA9bJLB-yqbDHH7n2Rszwx0bKU'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'fotosNET',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      public_id: req.body.codigo_net // Si el código NET viene del formulario
      // Si no, el controlador lo sube manualmente con el nombre correcto
    };
  }
});

module.exports = { cloudinary, storage };