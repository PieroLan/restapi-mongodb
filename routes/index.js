import express from "express";
import upload from "../config/multer.js";
import {
  crearCliente,
  listarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/clientesController.js";
import {
  crearProducto,
  listarProductos,
  mostrarProducto,
  eliminarProducto,
  actualizarProducto,
} from "../controllers/productosController.js";

//creamos router
const router = express.Router();

//rutas clientes
router.post("/clientes", crearCliente);
router.get("/clientes", listarClientes);
router.get("/clientes/:id", mostrarCliente);
router.put("/clientes/:id", actualizarCliente);
router.delete("/clientes/:id", eliminarCliente);

//rutas productos
router.post("/productos", upload.single("imagen"), crearProducto);
router.get("/productos", listarProductos);
router.get("/productos/:id", mostrarProducto);
router.delete("/productos/:id", eliminarProducto);
router.put("/productos/:id", upload.single("imagen"), actualizarProducto);

export default router;
