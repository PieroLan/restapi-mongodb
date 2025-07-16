import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    default: ''
  }
});

//Modelo
const Productos = mongoose.model("Productos", productoSchema);

export default Productos;
