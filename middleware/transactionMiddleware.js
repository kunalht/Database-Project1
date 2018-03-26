const mysql = require('mysql'),
    mysqlAuth = require('../config/mysqlAuth').mysqlAuth;

let transactionMiddleware = {};
let pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlAuth.host,
    user: mysqlAuth.user,
    password: mysqlAuth.password,
    database: mysqlAuth.db,
    port: mysqlAuth.port
});

transactionMiddleware.getAllTransactions = (req,res) => {
    console.log(req.query)
    let sid = req.query ? req.query.sid: null;
    let sDate = req.query ? req.query.sdate: null;
    let eDate = req.query ? req.query.edate: null;
    let month = req.query ? req.querymonth: null;
    let query = 'SELECT * FROM Finance ';
    if(sid){
        query.concat(`WHERE paidBySID= {$sid}`)
    }else if(sDate){
        // Add query for start date
    }else if(eDate){
        // End date
    }else if(month){
        // Month
    }
    pool.query(query,(err,foundTransactions) => {
        if(err){
            console.log(err)
        }else{
            console.log(foundTransactions);
            res.render('transaction/index')
        }
    })
}

transactionMiddleware.getNewTransaction = (req, res) => {
    res.render('transaction/new')
}

transactionMiddleware.postNewTransaction = (req, res) => {
    let amount = req.body.amount;
    let paidBy = req.body.paidBy;
    let studentId = req.body.sid;
    let type = req.body.type;
    let email = req.body.email;
    pool.query('SELECT * FROM Student WHERE sid=? OR email=?',[studentId,email],(err,foundStudent) => {
        if(err){
            console.log(err)
        }else{
            console.log(foundStudent.length)
            if(foundStudent.length>1){
                res.render('transaction/new',{"notvalid":isValid})
            }else if(foundStudent.length == 0){
                // Not found
            }else{
                res.redirect('back')
            }
        }
    })
}

transactionMiddleware.removeTransaction = (req, res) => {
    res.redirect('back')
}

transactionMiddleware.editTransaction = (req, res) => {
    res.redirect('back')
}

module.exports = transactionMiddleware;