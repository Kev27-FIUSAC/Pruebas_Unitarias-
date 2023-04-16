const express = require("express")
const router = express.Router()
const profileController = require("../controllers/profile.controller")

router.put("/editProfile", profileController.editprofile)
module.exports = router