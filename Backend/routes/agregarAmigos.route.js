const express = require("express")
const router = express.Router()
const agregarAmigosController = require("../controllers/agregarAmigos.controller")

router.get("/friends/:iduser", agregarAmigosController.getAllFriends)
router.get("/requests/:iduser", agregarAmigosController.getAllFriendRequests)
router.get("/users/:iduser", agregarAmigosController.getAllExceptFriends)
router.put("/reject", agregarAmigosController.rejectRequest)
router.put("/confirm", agregarAmigosController.confirmRequest)
router.put("/send-again", agregarAmigosController.sendRequest_Again)
router.post("/send-request", agregarAmigosController.sendRequest)


module.exports = router