const express = require('express');
const shortId = require('shortid');
const createHttpError = require('http-errors');
const ShortUrl = require('./models/urlmodel');
const path = require('path');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

connectDB();
const PORT = 5000;

app.get('/', async (req, res) => {
    res.render('index');
})

app.post('/', async (req, res, next) => {
    try {
        const { url } = req.body
        if (!url) {
            throw createHttpError.BadRequest('Provide a valid url')
        }
        const urlExists = await ShortUrl.findOne({ url: url })
        if (urlExists) {
            res.render('index', {
                // short_url: `${req.hostname}/${urlExists.shortId}`,
                short_url: `http://localhost:${PORT}/${urlExists.shortId}`,
            })
            return
        }
        const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
        const result = await shortUrl.save()
        res.render('index', {
            // short_url: `${req.hostname}/${urlExists.shortId}`,
            short_url: `http://localhost:${PORT}/${result.shortId}`,
        })
    } catch (error) {
        next(error)
    }
})


app.use((req, res, next) => {
    next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('index', { error: err.message })
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})