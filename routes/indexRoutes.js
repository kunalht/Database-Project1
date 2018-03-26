let express = require('express'),
    router = express.Router(),
    indexMiddleware = require('../middleware/indexMiddleware');

    router.get('/',indexMiddleware.getHomePage);


    module.exports = router;