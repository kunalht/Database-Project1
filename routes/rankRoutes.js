let express = require('express'),
    router = express.Router(),
    studentMiddleware = require('../middleware/studentMiddleware');
    rankMiddleware = require('../middleware/rankMiddleware');

    router.get('/ranks',rankMiddleware.getAllRanks);

    module.exports = router;