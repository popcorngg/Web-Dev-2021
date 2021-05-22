var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET counties page. */
router.get('/countries', function(req, res, next) {
    res.render('countries', { title: 'Страны' });
});

/* GET contacts page. */
router.get('/contacts', function(req, res, next) {
    res.render('contacts', { title: 'Контакты' });
});

/* GET counties page. */
router.get('/booking', function(req, res, next) {
    res.render('booking', { title: 'Заявка' });
});

module.exports = router;