const express = require('express');
const shortId = require('shortid');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(notFound);
app.use(errorHandlerMiddleware);

app.set('view engine','ejs');

connectDB();

app.get('/', async(req,res,next)=>{
    res.render('index');
})

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
})