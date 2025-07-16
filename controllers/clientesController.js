//importamos el modelo
import Clientes from "../models/Clientes.js";

//Método para crear un cliente
const crearCliente = async (req, res) => {
  try {
    const cliente = new Clientes(req.body);
    await cliente.save();
    res.status(201).json({ message: "Cliente creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Metodo para listar clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await Clientes.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

//Método para mostrar cliente por ID
const mostrarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ message: "ID no válido" });
  }
}

//Metodo para actualizar cliente por ID
const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(req.params.id, req.body, { new: true }); //devuelve el registro con los datos actualizados (por el new:true)
    if (!cliente) { 
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ message: "ID no válido" });
  }
}

//Metodo para eliminar un cliente por ID
const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "ID no válido" });
  }
}

//exportamos metodos
export { crearCliente, listarClientes, mostrarCliente, actualizarCliente, eliminarCliente };
