// Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Autenticar un usuario - api/auth
router.post("/", [authController.autenticarUsuario]);

// Obtiene el usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;