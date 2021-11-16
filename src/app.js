const express = require("express");
const cors = require("cors");
const multer = require("multer");
const ContenedorProductos = require("./classes/ContenedorProductos");
const app = express();

const server = app.listen(8080, () => {
  console.log("server listening on port 8080");
});
const contenedor = new ContenedorProductos();
const productsRouter = require("./routes/productos");
const usersRouter = require("./routes/users");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
//Middlewares
const upload = multer({ storage: storage });
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
///
///
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

//POST///
app.post("/api/adoption", (req, res) => {
  let userId = parseInt(req.body.uid);
  let productId = parseInt(req.body.pid);
  contenedor.adoptProduct(userId, productId).then((result) => {
    res.send(result);
  });
});

app.post("/api/uploadfile", upload.single("file"), (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    res.status(500).send({ message: "No se subió un archivo" });
  }
  res.send(files);
});
///// Lograr subir archivo file, consult profe
