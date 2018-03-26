let express = require('express'),
    router = express.Router(),
    studentMiddleware = require('../middleware/studentMiddleware');
    rankMiddleware = require('../middleware/rankMiddleware');

    router.get('/ranks',rankMiddleware.getAllRanks);
    router.get('/ranks/new',rankMiddleware.newRank);
    router.post('/ranks',rankMiddleware.postNewRank);

    module.exports = router;