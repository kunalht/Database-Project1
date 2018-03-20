let express = require('express'),
    router = express.Router(),
    adminMiddleware = require('../middleware/adminMiddleware');

    router.get('/admin',adminMiddleware.checkIfAdmin,adminMiddleware.getAdminIndex);
    router.get('/admin/student/new',adminMiddleware.addNewStudent);
    router.post('/admin/students',adminMiddleware.postNewUser);
    router.get('/admin/trasaction/new')

    module.exports = router;