let express = require('express'),
    router = express.Router(),
    studentMiddleware = require('../middleware/studentMiddleware');

    router.get('/students',studentMiddleware.getAllStudents);
    router.get('/student/new',studentMiddleware.addNewStudent);
    router.post('/students',studentMiddleware.postNewUser);
    router.get('/student/:id/parent/new',studentMiddleware.addNewParent);
    router.post('/student/:id/parent',studentMiddleware.postNewParent);
    router.get('/student/:id',studentMiddleware.getStudent);
    router.get('/student/:id/edit',studentMiddleware.getEditStudent);
    router.put('/student/:id',studentMiddleware.editStudent)
    router.delete('/student/:id/delete',studentMiddleware.deleteStudent);
    router.post('/student/:id/changeRank',studentMiddleware.changeRank)
    // router.get('/admin/trasaction/new')

    module.exports = router;