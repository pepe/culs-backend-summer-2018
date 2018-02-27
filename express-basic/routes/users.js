var express = require('express');
var router = express.Router();

var users = [{id: 1, name: "Josef", account: "pepe"},
             {id: 2, name: "Dosef", account: "dede"}];

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(users);
});

router.get('/:id', function(req, res, next) {
    var user = users.filter(function(u) {return req.params.id == u.id})[0];
    res.send(user);
});

module.exports = router;
