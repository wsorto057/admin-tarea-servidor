const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
require('dotenv').config({path: 'variables.env'});

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Puerto de la app
const host=process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

// Definir la página principal
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Arrancar el servidor
app.listen(PORT, host, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});


/* app.listen(PORT, host, () => {
  console.log('Servidor Funcionando');
}); */