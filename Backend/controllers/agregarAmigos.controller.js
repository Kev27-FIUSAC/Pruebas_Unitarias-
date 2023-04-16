const BD = require('../config/conexion');

exports.getAllFriends = async (req, res) => {
    try {
        let { iduser } = req.params
        let queryLogin = `SELECT u.idUsuario, u.username, u.img_url 
        FROM Usuario u, Solicitud_Amistad s
        WHERE s.idAmigo1 = ${iduser}
        AND s.idEstado = 1
        AND s.idAmigo2 = u.idUsuario`
        let result = await BD.Open(queryLogin);
        if (!result.length) {
            res.status(200).json([]);
        } else {
            res.status(200).json(result);
        }
    }
    catch (error) {
        //console.log("Error al realizar la consulta => ", error)
        res.status(400).json([])
    }
}

exports.getAllFriendRequests = async (req, res) => {
    try {
        let { iduser } = req.params
        let queryLogin = `SELECT u.idUsuario, u.username, u.img_url 
        FROM Usuario u, Solicitud_Amistad s
        WHERE s.idAmigo2 = ${iduser}
        AND s.idEstado = 3
        AND s.idAmigo1 = u.idUsuario`
        let result = await BD.Open(queryLogin);
        if (!result.length) {
            res.status(200).json([]);
        } else {
            res.status(200).json(result);
        }
    }
    catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.status(400).json([]);
    }
}

exports.getAllExceptFriends = async (req, res) => {
    try {
        let { iduser } = req.params
        let queryLogin = `SELECT u.idUsuario, u.username, u.img_url, e.estado
        FROM Usuario u, Solicitud_Amistad s, Estado_Amistad e
        WHERE s.idAmigo1 = ${iduser}
        AND s.idEstado <> 1
        AND s.idAmigo2 = u.idUsuario
        AND e.idEstadoAmistad = s.idEstado
        UNION
        SELECT u.idUsuario, u.username, u.img_url, 'NO-FRIENDS'
        FROM Usuario u
        WHERE u.idUsuario <> ${iduser}
        AND u.idUsuario NOT IN (SELECT s2.idAmigo1
                                FROM Solicitud_Amistad s2
                                WHERE s2.idAmigo2 =${iduser});`
        let result = await BD.Open(queryLogin);
        if (!result.length) {
            res.status(200).json([])
        } else {
            res.status(200).json(result);
        }
    }
    catch (error) {
        console.log("Error al realizar la consulta => ", error)
        res.status(400).json([])
    }
}

exports.rejectRequest = async (req, res) => {
    try {
        let { idAmigo1, idAmigo2 } = req.body

        let queryLogin = `UPDATE Solicitud_Amistad 
        SET idEstado = 2
        WHERE idAmigo1 = ${idAmigo1}
        AND idAmigo2 = ${idAmigo2}`
        let result = await BD.Open(queryLogin);

        let queryLogin2 = `INSERT INTO Solicitud_Amistad(idAmigo1, idAmigo2, idEstado)
        VALUES(${idAmigo2},${idAmigo1},2)`
        let result2 = await BD.Open(queryLogin2);

        res.status(200).json({
            status: true,
            result: "Solicitud Rechazada Correctamente",
        });
    }
    catch (error) {
        res.status(400).json({
            status: false,
            result: "Ocurrio un Error al Rechazar la Solicitud",
        });
    }
}

exports.confirmRequest = async (req, res) => {
    try {
        let { idAmigo1, idAmigo2 } = req.body

        let queryLogin = `UPDATE Solicitud_Amistad 
        SET idEstado = 1
        WHERE idAmigo1 = ${idAmigo1}
        AND idAmigo2 = ${idAmigo2}`
        let result = await BD.Open(queryLogin);

        let queryLogin2 = `UPDATE Solicitud_Amistad 
        SET idEstado = 1
        WHERE idAmigo1 = ${idAmigo2}
        AND idAmigo2 = ${idAmigo1}`
        let result2 = await BD.Open(queryLogin2);

        if (result2.changedRows > 0) {
            res.status(200).json({
                status: true,
                result: "Solicitud Aceptada Correctamente",
            });
        } else {
            let queryLogin3 = `INSERT INTO Solicitud_Amistad(idAmigo1, idAmigo2, idEstado)
            VALUES(${idAmigo2},${idAmigo1},1)`
            let result3 = await BD.Open(queryLogin3);
            res.status(200).json({
                status: true,
                result: "Solicitud Aceptada Correctamente",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: false,
            result: "Error al Aceptar la Solicitud",
        });
    }
}

exports.sendRequest_Again = async (req, res) => {
    try {
        let { idAmigo1, idAmigo2 } = req.body

        let queryLogin = `UPDATE Solicitud_Amistad 
        SET idEstado = 3
        WHERE idAmigo1 = ${idAmigo1}
        AND idAmigo2 = ${idAmigo2}`
        let result = await BD.Open(queryLogin);

        let queryLogin2 = `UPDATE Solicitud_Amistad 
        SET idEstado = 3
        WHERE idAmigo1 = ${idAmigo2}
        AND idAmigo2 = ${idAmigo1}`
        let result2 = await BD.Open(queryLogin2);

        res.status(200).json({
            status: true,
            result: "Solicitud Aceptada Correctamente",
        });
    }
    catch (error) {
        res.status(400).json({
            status: false,
            result: "Ocurrio un Error al Aceptar la Solicitud",
        });
    }
}

exports.sendRequest = async (req, res) => {
    try {
        let { idAmigo1, idAmigo2 } = req.body

        let queryLogin = `UPDATE Solicitud_Amistad 
        SET idEstado = 3
        WHERE idAmigo1 = ${idAmigo1}
        AND idAmigo2 = ${idAmigo2}`
        let result = await BD.Open(queryLogin);

        if (result.changedRows > 0) {
            res.status(200).json({
                status: true,
                result: "Solicitud Enviada Correctamente (updated)",
            });
        } else {
            let queryLogin2 = `INSERT INTO Solicitud_Amistad(idAmigo1, idAmigo2, idEstado)
        VALUES(${idAmigo1},${idAmigo2}, 3)`
            let result2 = await BD.Open(queryLogin2);
            res.status(200).json({
                status: true,
                result: "Solicitud Enviada Correctamente (inserted)",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: false,
            result: "Ocurrio un Error al Aceptar la Solicitud",
        });
    }
}
