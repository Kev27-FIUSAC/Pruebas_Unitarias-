const express = require("express")
const router = express.Router()
const loginController = require("../controllers/login.controller")

router.get("/iniciarSesion/:user/:password", loginController.iniciarSesion)

module.exports = router