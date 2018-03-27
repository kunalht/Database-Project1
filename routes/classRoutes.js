let express = require('express'),
    router = express.Router(),
    classMiddleware = require('../middleware/classMiddleware');

    router.get('/class',classMiddleware.getAllclasses);
    router.get('/class/new',classMiddleware.addNewClass);
    router.post('/classes',classMiddleware.postNewClass);
    router.get('/class/:id',classMiddleware.addNewStudent);
    router.post('/class/:id/student',classMiddleware.postNewStudent)
    router.get('/class/:id/attendance/new',classMiddleware.getNewAttendance)
    router.post('/class/:id/attendance',classMiddleware.postNewAttendance)
    router.post('/class/:id/getAttendance',classMiddleware.getAttendance)
    router.delete('/class/:id/d',classMiddleware.deleteClass)
    router.put('/class/:id/edit',classMiddleware.editClass)

    // router.get('/class/:id',classMiddleware.getclass);
    // router.get('/class/:id/edit',classMiddleware.getEditclass);
    // router.put('/class/:id',classMiddleware.editclass)
    // router.delete('/class/:id/delete',classMiddleware.deleteclass);
    // router.get('/admin/trasaction/new')

    module.exports = router;