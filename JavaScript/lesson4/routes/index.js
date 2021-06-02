var express = require('express');
var router = express.Router();
const Book = require('../models/book');
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
    var pole1 = parseInt(req.body.pole1);
    var pole2 = parseInt(req.body.pole2);
    var x = pole1 + pole2;
    var y = pole1 - pole2;
    var ser = (pole1 + pole2) / 2;
    res.render('test-result', { pole1: pole1, pole2: pole2, sum: x, riz: y, ser });
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

router.get('/books', async function(req, res) {
    try {
        let books = await Book.find({});
        res.send(books);
    } catch (e) {
        res.status(500);
    }
});

router.get('/books-demo2', async function(req, res) {
    try {
        let books = await Book.find({});
        res.render('books', {
            title: 'Книги',
            books: books
        })
    } catch (e) {
        res.status(500);
    }
});

module.exports = router;