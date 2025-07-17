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

//Metodo para listar productos
const listarProductos = async (req, res) => {
  try {
    const productos = await Productos.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Método para mostrar producto por ID
const mostrarProducto = async (req, res) => {
  try {
    const producto = await Productos.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ message: "ID no válido" });
  }
};

//Metodo para actualizar producto por ID
const actualizarProducto = async (req, res) => {
  try {
    //verificamos si existe el producto
    let producto = await Productos.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    //data nueva
    const dataNueva = { ...req.body };

    // Si se subió una imagen, agregar la ruta
    if (req.file) {
      dataNueva.imagen = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }

    // Actualizar correctamente
    const productoActualizado = await Productos.findByIdAndUpdate(
      req.params.id,
      dataNueva,
      { new: true }
    );
    res.status(201).json({ message: "Producto actualizado exitosamente", producto: productoActualizado });
  } catch (error) {
    res.status(400).json({ message: "ID no válido" });
  }
};

//Metodo para eliminar un producto por ID
const eliminarProducto = async (req, res) => {
  try {
    const producto = await Productos.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "ID no válido" });
  }
};

export {
  crearProducto,
  listarProductos,
  mostrarProducto,
  actualizarProducto,
  eliminarProducto,
};
