const express = require("express")
const router = express.Router()
const publicacionesController = require("../controllers/publicaciones.controller")

router.post("/new-post", publicacionesController.newPost)
router.post("/posts",publicacionesController.getallPosts)


module.exports = router