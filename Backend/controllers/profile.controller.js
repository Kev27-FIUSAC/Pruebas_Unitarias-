const BD = require("../config/conexion");
var uuid = require('uuid');
const aws_keys = require('../config/creds');
var AWS = require('aws-sdk');
const s3 = new AWS.S3(aws_keys.s3);
exports.editprofile = async (req, res) => {
  const { username, newpassword, password, name, img_url, imgbase64 } = req.body;

  let nuevaP = "";
  if (newpassword.length > 0) {
    nuevaP = newpassword;
  } else {
    nuevaP = password;
  }
  let final_url = "";
  if (imgbase64 === 0) {
    //Convert imgbase64 to imgurl (post to s3)
    final_url = img_url;
    let sql = `UPDATE Usuario SET nombre = '${name}', pass = '${nuevaP}', img_url = '${img_url}'
    WHERE username='${username}' and pass = '${password}'`;
    try {
      const SQLresult = await BD.Open(sql);
      res.status(200).json({status: true, result: SQLresult});
    } catch (err) {
      res.status(200).json({ status: false, result: "Ocurrio un error" });
      console.log("ERROR: " + err);
    }
  }else{
    final_url = img_url;
    let nombrei = req.body.nickname + "-pp" + "-" + uuid.v4() + ".jpg";
    let buff = Buffer.from(imgbase64, "base64");
    const params = {
      Bucket: "tarea2-201314007",
      Key: nombrei,
      Body: buff,
      ContentType: "image",
      ACL: "public-read",
    };
    s3.upload(params, async function sync(err, data) {
      if (err) {
        res.status(500).send(err);
      } else {
        final_url = data.Location;
        let sql = `UPDATE Usuario SET nombre = '${name}', pass = '${nuevaP}', img_url = '${final_url}'
        WHERE username='${username}' and pass = '${password}'`;
        try {
          const SQLresult = await BD.Open(sql);
          res.status(200).json({status: true, result: SQLresult});
        } catch (err) {
          res.status(200).json({ status: false, result: "Ocurrio un error" });
          console.log("ERROR: " + err);
        }
      }
    });
  }


  
};
