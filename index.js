const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
require('dotenv').config({path: 'variables.env'});

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();


// Habilitar express.json
app.use(express.json({ extended: true }));

// Puerto de la app
const host=process.env.HOST || '0.0.0.0';
const port = process.env.port || 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://ecstatic-ritchie-9df38a.netlify.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//definicion de dominio para recibir peticiones
const whitelist=[process.env.FRONTEND_URL];
const corsOptions={
    origin: (origin, callback)=>{
        //revisar si la peticion esta en lista blanca
        const extiste= whitelist.some(dominio=> dominio===origin);
        if(existe){
            callback(null, true);
        } else{
            callback(new Error('no permitido por CORS'));
        }

    }
}


// Habilitar cors
app.use(cors(corsOptions));


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
app.listen(port, host, () => {
  console.log('servidor funcionando');
});
