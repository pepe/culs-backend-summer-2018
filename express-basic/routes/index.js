var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CULS CBD - Basic Express application in the year of the Dog' });
});

module.exports = router;
