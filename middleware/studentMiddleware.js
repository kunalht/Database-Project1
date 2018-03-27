const mysql = require('mysql'),
    mysqlAuth = require('../config/mysqlAuth').mysqlAuth;

let studentMiddleware = {};
let pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlAuth.host,
    user: mysqlAuth.user,
    password: mysqlAuth.password,
    database: mysqlAuth.db,
    port: mysqlAuth.port
});

studentMiddleware.addNewStudent = (req,res) => {
    res.render('student/new')
}

studentMiddleware.postNewUser = (req, res) => {
    let sid = req.body.sid
    let name = req.body.name
    let email = req.body.email
    let phNumber = req.body.phNumber
    let dob = req.body.DOB
    let joiningDate = req.body.joiningDate
    let address = req.body.address
    let city = req.body.city
    let areacode  = req.body.areacode
    pool.query('INSERT INTO Student(sid,name,dateOfBirth,joiningDate,phNumber,email,address,city,areacode) '+
    'VALUES(?,?,?,?,?,?,?,?,?)',[sid,name,dob,joiningDate,phNumber,email,address,city,areacode], (err,newStudent) => {
        if(err){
            console.log(err)
        }else{
            let studentId = newStudent.insertId;
            pool.query('INSERT INTO StudentRank(studentId,rankId,isCurrent) VALUES(?,1,True)',[studentId],(err,sid) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(sid);
                }
            })
            res.redirect('back')
        }
    })
}

studentMiddleware.getAllStudents = (req, res) => {
    pool.query('SELECT * FROM Student',(err,allStudents) => {
        if(err){
            console.log(err)
        }else{
            res.render('student/index',{students: allStudents})
        }
    })
}

studentMiddleware.addNewParent = (req, res) => {
    let studentId = req.params.id;
    res.render('student/newParent',{studentId:studentId});
}

studentMiddleware.postNewParent = (req, res) => {
    let studentId = req.params.id;
    let parentName = req.body.name;
    let parentRelation = req.body.parentRelation;
    let phNumber = req.body.phNumber;
    let emailId = req.body.email;
    pool.query('INSERT INTO Parent(parentOfStudentId,name,parentRelation,phNumber,emailId) VALUES (?,?,?,?,?)',
    [studentId,parentName,parentRelation,phNumber,emailId],(err,newParent) => {
        res.redirect('back')
    })
}

studentMiddleware.getStudent = (req, res) => {
    let id = req.params.id;
    pool.query('SELECT *,P.name AS parentName,S.id AS studentId FROM Student AS S LEFT JOIN Parent AS P ON S.id = P.parentOfStudentId'+
    ' WHERE S.id=?',[id],(err,student) => {
        if(err){
            console.log(err)
        }else{
            pool.query('SELECT * FROM StudentRank JOIN Rank ON StudentRank.rankId = Rank.id WHERE studentId = ?',[id],(err,ranks) => {
                pool.query('SELECT * FROM Rank',(err,allRanks) => {
                    if(err){
                        console.log(err)
                    }else{
                        res.render('student/show',{student:student,ranks:ranks,allRanks:allRanks})
                    }
                })
            })
        }
    })
}

studentMiddleware.getEditStudent = (req, res) => {
    console.log("EDIT")
    let studentId = req.params.id;
    pool.query('SELECT * FROM Student WHERE id=?',[studentId],(err,student)=> {
        if(err){
            console.log(err)
        }else{
            res.render('student/edit',{student:student});
        }
    })
}

studentMiddleware.editStudent = (req, res) => {
    let studentId = req.params.id
    let sid = req.body.sid
    let name = req.body.name ? req.body.name : null
    let email = req.body.email ? req.body.email: null
    let phNumber = req.body.phNumber ? req.body.phNumber: null
    let address = req.body.address ? req.body.address: null
    let city = req.body.city ? req.body.city: null
    let areacode  = req.body.areacode ? req.body.areacode: null
    let query =`UPDATE Student SET sid=${sid},name=${name},phNumber=${phNumber} WHERE id=${studentId}`
    console.log(query)
    // pool.query('UPDATE Student SET sid=?,name=?,email=?,phNumber=?,address=?,city=?,areacode=? WHERE id=?',
    pool.query(query,
   (err,updatedStudent) => {
        if(err){
            console.log(err)
        }else{
            console.log(updatedStudent);
        }
    })
}

studentMiddleware.deleteStudent = (req, res) => {
    let studentId= req.parmas.id
    pool.query('DELETE FROM Student WHERE id=?',[studentId], (err,deletedStudent) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('back')
        }
    })
}

studentMiddleware.changeRank = (req, res) => {
    let id = req.params.id
    let rankId = req.body.rank
    console.log(id)
    pool.query('UPDATE StudentRank SET isCurrent = FALSE WHERE studentId = ?',[id],(err, updatedStudent) => {
        if(err){
            console.log(err)
        }else{
            pool.query('INSERT INTO StudentRank(studentId,rankId,isCurrent) VALUES(?,?,True)',[id,rankId],(err,newRank) => {
                if(err){
                    console.log(err)
                }else{
                    res.redirect('back')
                }
            })
        }
    })
}

studentMiddleware.removeStudent = (req, res) => {
    let id = req.params.id
    pool.query('UPDATE Student SET isDeleted=True WHERE id=?',[id],(err,deletedStudent) => {
        if(err){
            console.log(err)
        }else{
            res.redirect('back')
        }
    })
}
studentMiddleware.newTransaction = (req,res) => {
}
module.exports = studentMiddleware;