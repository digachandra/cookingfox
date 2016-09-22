var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('template-list', { title: 'Cooking Fox' });
});

router.get('/:slug', function(req, res, next) {
  res.render('template-detail', { title: 'Cooking Fox' });
});

module.exports = router;
