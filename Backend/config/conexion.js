require('dotenv').config()
var mysql = require('mysql');

credentials = {
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    host: process.env.HOST_MYSQL,
    database: process.env.DATABASE_MYSQL
}

var con = mysql.createConnection(credentials)
con.connect(function (err) {
    if (err) throw err;
    //console.log("Connected!");
});

const doQuery = (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) return reject(error);
            //console.log('Consulta correcta');
            return resolve(results);
        });
    });
}


async function Open(sql) {

    const results = await doQuery(sql);
    return results
}

function get_conection(){
    return con;
}

exports.Open = Open;
exports.Get_Conection = get_conection;