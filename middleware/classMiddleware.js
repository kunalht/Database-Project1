const mysql = require('mysql'),
    mysqlAuth = require('../config/mysqlAuth').mysqlAuth,
    moment = require('moment')

let classMiddleware = {};
let pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlAuth.host,
    user: mysqlAuth.user,
    password: mysqlAuth.password,
    database: mysqlAuth.db,
    port: mysqlAuth.port
});

classMiddleware.getAllclasses = (req,res) => {
    pool.query('SELECT * FROM Class',(err,allClasses) => {
        if(err){
            console.log(err)
        }else{
            console.log(allClasses)
            res.render('class/index',{classes:allClasses})
        }
    })
}

classMiddleware.addNewClass = (req, res) => {
    res.render('class/new')
}

classMiddleware.postNewClass = (req, res) => {
    let classLevel = req.body.level
    let day = req.body.day
    let time = req.body.time
    let name = req.body.name
    pool.query('INSERT INTO Class(name,classLevel,time,dayOfWeek) VALUES(?,?,?,?)',[name,classLevel,time,day],(err,newRank) => {
        if(err){
            console.log(err)
        }else{
            console.log(newRank)
            res.redirect('back')
        }
    })
}

classMiddleware.addNewStudent = (req, res) => {
    let classId = req.params.id
    pool.query('SELECT * FROM Class WHERE id=?',[classId],(err,foundClass) => {
        if(err){
            console.log(err)
        }else{
            pool.query('SELECT * FROM Attendance WHERE classId =? GROUP BY date',[classId],(err,classDates) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(classDates[0].date.toDateString())
                    res.render('class/show.ejs',{foundClass:foundClass[0],classDates:classDates})
                }
            })
        }
    })
}

classMiddleware.postNewStudent = (req, res) => {
    let sid = req.body.sid
    let classId = req.params.id
    pool.query('SELECT * FROM Class WHERE id=?',[classId],(err,foundClass) => {
        if(err){
            console.log(err)
        }else{
            res.render('class/show.ejs',{foundClass:foundClass[0]})
        }
    })
}

classMiddleware.getNewAttendance = (req, res) => {
    let classId = req.params.id
    pool.query('SELECT * FROM Class WHERE id = ?',[classId],(err,foundClass) => {
        if(err){
            console.log(err)
        }else{
            pool.query('SELECT * FROM Student',(err,students) => {
                if(err){
                    console.log(err)
                }else{
                    res.render('class/attendance',{foundClass:foundClass[0],students:students})
                }
            })
        }
    })
}
classMiddleware.postNewAttendance = (req, res ) => {
    let presentStudents = req.body.students;
    let classId = req.params.id
    let date = req.body.day
        presentStudents.forEach((student)=> {
            pool.query('INSERT INTO Attendance(classId,studentId,isPresent,date) VALUES(?,?,True,?)',
            [classId,student,date], (err,attendance) => {
                if(err){
                    console.log(err)
                }else{
                }
            })
        })
        res.redirect('back')
}

// classMiddleware.showAllAttendance = (req, res) => {
//     let 
// }

classMiddleware.getDateAttendance = (req, res) => {
    console.log(req.params)
    let classId = req.params.id
    let date = req.body.datet
    console.log(Date.parse(date))
    pool.query('SELECT * FROM Attendance WHERE date =?',[classId,Date.parse(date)],(err,attendance) => {
        if(err){
            console.log(err)
        }else{
            console.log(attendance)
        }
    })
    res.render('class/presentstudents')
}
classMiddleware.removeRank = (req, res) => {
    res.redirect('back')
}

classMiddleware.editRank = (req, res) => {
    res.redirect('back')
}

module.exports = classMiddleware;