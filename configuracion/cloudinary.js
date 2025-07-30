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
    // Si el código NET viene en el formulario, úsalo como nombre de la imagen
    // Si no, puedes dejarlo como undefined y luego renombrar en el controlador
    return {
      folder: 'fotosNET',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      public_id: req.body.codigo_net // El nombre de la imagen será el código NET
    };
  }
});

module.exports = { cloudinary, storage };