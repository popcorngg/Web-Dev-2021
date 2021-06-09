var express = require('express');
var Book = require('../models/book');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// /books/ GET (many)
router.get('/books/', async(req, res) => {
    try {
        const books = await Book.find({});
        res.render('books', { title: 'Книги', books: books })
    } catch (error) {
        console.error(error);
        res.render('error', error);
    }
});

// /book/:id GET (1)
router.get('/book/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (book != null)
            res.render('book-details', { title: 'Книга деталі', book: book })
        else
            res.render('book-error', { title: 'Книга не знайдена', id: id })
    } catch (error) {
        console.error(error);
        res.render('error', error);
    }
});

// /book/:id DELETE (1)
router.delete('/book/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findByIdAndDelete(id);
        if (book != null)
            res.render('book-success', { title: 'Успіх', id: id })
        else
            res.render('book-error', { title: 'Книга не знайдена', id: id })
    } catch (error) {
        console.error(error);
        res.render('error', error);
    }
});
// /book/ POST (1)
router.post('/book', async(req, res) => {
    const book = new Book(req.body);
    if (book.published < 0)
        book.published = 0;
    try {
        await book.save();
        if (book != null)
            res.render('book-success', { title: 'Успіх', id: id })
        else
            res.render('book-error', { title: 'Книга не створена', id: id })
    } catch (error) {
        console.error(error);
        res.render('error', error);
    }
});

// /book/:id PUT (1)
router.put('/book/:id', async(req, res) => {
    const id = req.params.id;
    let year = req.body.published | 0;
    if (year < 0)
        req.body.published = 0;
    let bookdata = {
        "author": req.body.author,
        "title": req.body.title,
        "published": req.body.published,
        "publisher": req.body.publisher,
    };
    console.log(bookdata);

    try {
        const book = await Book.findByIdAndUpdate(id, bookdata);
        if (book != null)
            res.status(200).send('Ok');
        else
            res.render('book-error', { title: 'Книга не знайдена', id: id })
    } catch (error) {
        console.error(error);
        res.render('error', error);
    }
});

router.get('/book-delete/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (book != null)
            res.render('book-delete', { title: 'Книга деталі', book: book })
        else
            res.render('book-error', { title: 'Книга не знайдена', id: id })
    } catch (error) {
        console.error(error);
        res.render('error', error);
    }
});

router.get('/book-create/', function(req, res, next) {
    res.render('book-create', { title: 'Створення книги' });
});


module.exports = router;