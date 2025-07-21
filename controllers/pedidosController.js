import Pedidos from "../models/Pedidos.js";

// Método para crear un pedido
const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedidos(req.body);
    await nuevoPedido.save();
    res.status(201).json({ message: "Pedido registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Metodo para listar pedidos
const listarPedidos = async (req, res) => {
  try {
    //buscamos los pedidos
    const pedidos = await Pedidos.find()
      .populate("cliente")
      .populate("productos.producto");
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Metodo para bucar pedido por id
const mostrarPedido = async (req, res) => {
  try {
    const pedido = await Pedidos.findById(req.params.id)
      .populate("cliente")
      .populate("productos.producto");
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Metodo para actualizar un pedido
const actualizarPedido = async (req, res) => {
  try {
    const pedido = await Pedidos.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    const pedidoActualizado = await Pedidos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Pedido actualizado exitosamente",
      pedido: pedidoActualizado,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Metodo para eliminar un pedido
const eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedidos.findByIdAndDelete(req.params.id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.status(200).json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  crearPedido,
  listarPedidos,
  mostrarPedido,
  eliminarPedido,
  actualizarPedido,
};
