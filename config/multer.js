import multer from "multer";
import shortid from "shortid";
import path from "path";

// Configuración de almacenamiento
const storage = multer.diskStorage({
  // Destino donde se guardarán los archivos
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardan los archivos
  },
  
  // Nombre del archivo
  filename: (req, file, cb) => {
    // Generar nombre único: shortid + timestamp + extensión original
    const extension = path.extname(file.originalname);
    const filename = `${shortid.generate()}-${Date.now()}${extension}`;
    cb(null, filename);
  }
});

// Filtro para tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
  // Permitir solo imágenes
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

// Configuración de multer (el que vamos a utilizar en nuestro controlador)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite de 5MB
  }
});

export default upload;