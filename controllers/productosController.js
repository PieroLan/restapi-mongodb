import Productos from "../models/Productos.js";

//Metodo para registrar un nuevo producto
const crearProducto = async (req, res) => {
  try {
    // Crear objeto producto con los datos del formulario
    const productoData = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
    };
    // Si se subió una imagen, agregar la ruta
    if (req.file) {
      productoData.imagen = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }

    const producto = new Productos(productoData);
    await producto.save();
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export { crearProducto };
