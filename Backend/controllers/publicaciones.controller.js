const BD = require("../config/conexion");
var uuid = require('uuid');
const aws_keys = require('../config/creds');
var AWS = require('aws-sdk');
const s3 = new AWS.S3(aws_keys.s3);


exports.newPost = async(req, res) => {
    try{
        const { imagen, texto, idUser, fecha } = req.body;
        //Imagen = Base 64 a subir al server.
        //VERSION LOCAL (default img)
        if (imagen == undefined || imagen.length == 0) {
          let img_url = "";
          let sql = `INSERT INTO Publicacion(url_imagen, texto,Publicacion_idUsuario, fecha)
            VALUES('${img_url}', '${texto}', ${idUser}, '${fecha}')`;
          try {
            //IMAGEN BASE64 TO S3
            const result = await BD.Open(sql);
            res.status(200).json({
              status: true,
              result: "Publicado Correctamente",
              idPost: result.insertId,
            });
          } catch (err) {
            res.status(200).json({ status: false, result: "Ocurrio un error" });
            console.log("ERROR: " + err);
          }
        } else {
          
          //PLACE img to S3 profile pictures bucket
          let nombrei = req.body.nickname + "-pp" + "-" + uuid.v4() + ".jpg";
          let buff = Buffer.from(imagen, "base64");
          const params = {
            Bucket: "tarea2-201314007",
            Key: nombrei,
            Body: buff,
            ContentType: "image",
            ACL: "public-read",
          };
          s3.upload(params, async function sync(err, data) {
            if (err) {
              console.log("ERR: ", err)
              res.status(500).send(err);
            } else {
              console.log("loc: ", data.Location)
              let sql = `INSERT INTO Publicacion(url_imagen, texto, Publicacion_idUsuario)
            VALUES('${data.Location}', '${texto}', ${idUser})`;
              try {
                const result = await BD.Open(sql);
                res.status(200).json({
                  status: true,
                  result: "Publicado Correctamente",
                  idPost: result.insertId,
                });
              } catch (err) {
                console.log("asdad")
                res.status(200).json({ status: false, result: "Ocurrio un error" });
                console.log("ERROR: " + err);
              }
            }
          });
        }
    }
    catch(error)
    {
        console.log("Error al realizar la consulta => ",error)
        res.json({})
    }
}

exports.getallPosts = async (req, res) => {
  try {
    const usuario = req.body.idUsuario;
    let sql = `SELECT idPublicacion, url_imagen, texto, u.username, P.fecha 
    FROM Publicacion P , Usuario U
    WHERE P.Publicacion_idUsuario = U.idUsuario
    AND U.idUsuario = ${usuario}
    UNION
    SELECT idPublicacion, url_imagen, texto, u.username, P.fecha  
    FROM Publicacion P , Usuario U, Solicitud_Amistad S
    WHERE P.Publicacion_idUsuario = U.idUsuario
    AND S.idAmigo1 = ${usuario}
    AND S.idAmigo2 = P.Publicacion_idUsuario
    AND S.idEstado = 1
    UNION 
    SELECT idPublicacion, url_imagen, texto, u.username, P.fecha 
    FROM Publicacion P , Usuario U, Solicitud_Amistad S
    WHERE P.Publicacion_idUsuario = U.idUsuario
    AND S.idAmigo1 = P.Publicacion_idUsuario
    AND S.idAmigo2 = ${usuario}
    AND S.idEstado = 1
    ORDER BY idPublicacion DESC;
    `;
    try {
      const result = await BD.Open(sql);
      if (result.length > 0) {
        let publicaciones = [];
        for (let i = 0; i < result.length; i++) {
          let sqlTag = `SELECT E.etiqueta FROM Publicacion P, Etiqueta E, Post_Tags PT
          WHERE P.idPublicacion = PT.Publicacion_idPublicacion
          AND PT.Etiqueta_idEtiqueta = E.idEtiqueta
          AND PT.Publicacion_idPublicacion = ${result[i].idPublicacion}`;
          const resultTag = await BD.Open(sqlTag);
          publicaciones.push({
            publicacion: result[i],
            etiquetas: resultTag,
          });
        }
        res.json(publicaciones);
      } else {
        res.json([]);
      }
    } catch (err) {
      res.json([]);
      console.log("ERROR: " + err);
    }
  } catch (err) {
    console.log("Error al realizar la consulta => ", error);
    res.json([]);
  }
};
