const mysql = require('mysql'),
    mysqlAuth = require('../config/mysqlAuth').mysqlAuth;

let rankMiddleware = {};
let pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlAuth.host,
    user: mysqlAuth.user,
    password: mysqlAuth.password,
    database: mysqlAuth.db,
    port: mysqlAuth.port
});

rankMiddleware.getAllRanks = (req,res) => {
    console.log(req.query)
    res.render('transaction/index')
}

rankMiddleware.newRank = (req, res) => {
    res.render('transaction/new')
}

rankMiddleware.removeRank = (req, res) => {
    res.redirect('back')
}

rankMiddleware.editRank = (req, res) => {
    res.redirect('back')
}

module.exports = rankMiddleware;