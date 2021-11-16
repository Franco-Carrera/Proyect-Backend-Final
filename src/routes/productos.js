const express = require("express");
const router = express.Router();

const ContenedorProductos = require("../classes/ContenedorProductos");
const contenedor = new ContenedorProductos();

/// GET
router.get("/", (req, res) => {
  contenedor.getAllProducts().then((result) => {
    res.send(result);
  });
});

router.get("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  contenedor.getProductById(id).then((result) => {
    res.send(result);
  });
});

/// POST
router.post("/", (req, res) => {
  let product = req.body;
  contenedor.registerProduct(product).then((result) => {
    res.send(result);
  });
});

//PUT
router.put("/:pid", (req, res) => {
  let body = req.body;
  let id = parseInt(req.params.pid);
  contenedor.updateProduct(id, body).then((result) => {
    res.send(result);
  });
});

//DELETE
router.delete("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  contenedor.deleteProduct(id).then((result) => {
    res.send(result);
  });
});

module.exports = router;
