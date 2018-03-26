let express = require('express'),
    router = express.Router(),
    studentMiddleware = require('../middleware/studentMiddleware');
    transactionMiddleware = require('../middleware/transactionMiddleware');

    router.get('/transactions',transactionMiddleware.getAllTransactions);
    router.get('/transactions/new',transactionMiddleware.getNewTransaction);
    router.post('/transactions',transactionMiddleware.postNewTransaction);
    router.put('/transactions/:id/edit',transactionMiddleware.editTransaction);
    router.delete('/transactions/:id',transactionMiddleware.removeTransaction);


    module.exports = router;