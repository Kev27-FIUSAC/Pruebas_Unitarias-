const express = require("express")
const router = express.Router()
const RegistroController = require("../controllers/Registro.controller")

router.post("/registrar", RegistroController.signup)
module.exports = router