const mysql = require('mysql'),
    mysqlAuth = require('../config/mysqlAuth').mysqlAuth;

let adminMiddleware = {};
let pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlAuth.host,
    user: mysqlAuth.user,
    password: mysqlAuth.password,
    database: mysqlAuth.db,
    port: mysqlAuth.port
});

adminMiddleware.checkIfAdmin = (req,res,next) => {
    if(req.user){
        console.log("loggedin")
        next();
    }else{
        console.log("NOT AN ADMIN")
        res.redirect('/')
    }
}

adminMiddleware.getAdminIndex = (req, res) => {
    res.render('admin/index')
}

adminMiddleware.addNewStudent = (req,res) => {
    res.render('student/new')
}

adminMiddleware.postNewUser = (req, res) => {
    console.log(req.body)
    let sid = req.body.sid
    let name = req.body.name
    let email = req.body.email
    let phNumber = req.body.phNumber
    let dob = req.body.DOB
    let joiningDate = req.body.joiningDate
    pool.query('INSERT INTO Student(sid,name,dateOfBirth,joiningDate,phNumber,email) '+
    'VALUES(?,?,?,?,?,?)',[sid,name,dob,joiningDate,phNumber,email], (err,newStudent) => {
        if(err){
            console.log(err)
        }else{
            console.log(newStudent)
            res.redirect('/admin')
        }
    })
}

adminMiddleware.newTransaction = (req,res) => {
}
module.exports = adminMiddleware;