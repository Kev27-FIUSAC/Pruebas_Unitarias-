const BD = require('../config/conexion');

exports.iniciarSesion = async (req, res) => {
    try{
        let{user,password} = req.params
        let queryLogin = `SELECT * FROM Usuario WHERE username='${user}' AND pass='${password}'`
        let result = await BD.Open(queryLogin);
        if(!result.length){
            res.status(400).json({autenticacion:false})
        }else{
            res.status(200).json({autenticacion:true,user:result[0]});
        }
    }
    catch(error)
    {
        console.log("Error al realizar la consulta => ",error)
        res.status(400).json({})
    }
}