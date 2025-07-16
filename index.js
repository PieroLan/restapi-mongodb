import express from 'express';
import routes from "./routes/index.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

// Para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

//establecemos la conexión a MongoDB (versión async/await)
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Conectado a MongoDB');
} catch (error) {
  console.log('Error de conexión:', error);
}

//creamos el servidor
const app = express();


// Middleware para parsear JSON (Body Parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para form-urlencoded también

// Servir archivos estáticos (para acceder a las imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar todas las rutas
app.use('/', routes);

// puerto
app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en el puerto respectivo');
});
