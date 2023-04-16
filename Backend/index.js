//Routes
const loginRouter = require('./routes/login.route.js')
const agregarAmigosRouter = require('./routes/agregarAmigos.route.js')
const profileRouter = require('./routes/profile.route.js')
const registroRouter = require("./routes/registro.route.js")
const publicacionesRouter = require('./routes/publicaciones.route.js')
//Servidor
require('dotenv').config()
var express = require('express');
const bodyParser = require('body-parser');

var app = express();
const cors = require('cors')
const port = process.env.PORT

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//Login

app.use("/login", loginRouter)
app.use("/api", agregarAmigosRouter)
app.use("/api", publicacionesRouter)
//Profile
app.use("/profile", profileRouter)
//Registro
app.use("/signup",registroRouter)

app.listen(port, function () {
  console.log('Listening on port', port);
});

module.exports = app;

