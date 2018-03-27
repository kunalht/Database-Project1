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
    pool.query('SELECT * FROM Rank',(err,allRanks) => {
        if(err){
            console.log(err)
        }else{
            res.render('rank/index',{ranks:allRanks})
        }
    })
}

rankMiddleware.newRank = (req, res) => {
    res.render('rank/new')
}

rankMiddleware.postNewRank = (req, res) => {
    let rankColor = req.body.color;
    pool.query('INSERT INTO Rank(color) VALUES(?)',[rankColor],(err,newRank) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('back')
        }
    })
}

rankMiddleware.removeRank = (req, res) => {
    res.redirect('back')
}

rankMiddleware.editRank = (req, res) => {
    res.redirect('back')
}

rankMiddleware.addStudent = (req, res) => {
    pool.query('SELECT * FROM Student WHERE id')
}
module.exports = rankMiddleware;