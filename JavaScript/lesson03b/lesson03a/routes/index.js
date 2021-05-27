var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

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

router.get('/test', function(req, res, next) {
    res.render('test', { title: 'Заявка' });
});

router.post('/test', function(req, res, next) {
    console.log(req.body.pole2);
    var x = Number(req.body.pole1) + Number(req.body.pole2);
    var y = req.body.pole1 - req.body.pole2;
    res.render('test-result', { pole1: req.body.pole1, pole2: req.body.pole2, sum: x, riz: y });
});

/* POST booking page. */
router.post('/booking', function(req, res, next) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andruhovski@gmail.com',
            pass: 'freiixagxlunljhq'
        }
    });

    const mailOptions = {
        from: 'andruhovski@gmail.com',
        to: 'andruhovski@kpnu.km.ua',
        subject: 'Заявка на тур',
        text: 'Надійшла заявка на тур від ' + req.body.username +
            ' Зв`яжіться з ним за адресою ' + req.body.email +
            ' або за телефоном' + req.body.phone,
        html: 'Надійшла заявка на тур від <strong>' + req.body.username +
            '</strong> Зв`яжіться з ним за адресою ' +
            '<a href=mailto:' + req.body.email + '>' + req.body.email + '</a>' +
            ' або за телефоном <a href=callto:' + req.body.phone + '>' + req.body.phone + '</a>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.render('booking-error', { title: 'Заявка' });
        } else {
            console.log('Email sent: ' + info.response);
            res.render('booking-success', { title: 'Заявка' });
        }
    });



});

module.exports = router;