const BD = require("../config/conexion.js");
var uuid = require("uuid");
const aws_keys = require("../config/creds");
var AWS = require("aws-sdk");
const s3 = new AWS.S3(aws_keys.s3);
exports.signup = async (req, res) => {
  const imagen = req.body.imagen64;
  let nombrei = req.body.nickname + "-pp" + "-" + uuid.v4() + ".jpg";
  let buff = Buffer.from(imagen, "base64");
  console.log("base64: ", imagen)
  const params = {
    Bucket: "tarea2-201314007",
    Key: nombrei,
    Body: buff,
    ContentType: "image",
    ACL: "public-read",
  };
  console.log("PARAMS: ", params);
  s3.upload(params, async function sync(err, data) {
    if (err) {
      console.log("ERR: ", err);
      res.status(500).send(err);
    } else {
      console.log("loc: ", data.Location);
      //INgresar usuario a la base de datos.
      try {
        //URL IMAGEN: (Enviar base64 a S3)
        //BASE 64: req.body.imagen64
        let img_url = data.Location;

        let sql = `INSERT INTO Usuario(username,img_url, email, nombre, pass)
            VALUES('${req.body.nickname}', '${img_url}', '${req.body.email}', '${req.body.name}', '${req.body.pass}')`;

        const result = BD.Open(sql);
        res.status(200).json({
          status: true,
          result: "Registrado Satisfactoriamente",
          data: result,
        });
      } catch (err) {
        res.status(200).json({ status: false, result: "Ocurrio un error" });
        console.log("ERROR: " + err);
      }
    }
  });
};
