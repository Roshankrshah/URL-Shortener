const express = require('express');
const shortId = require('shortid');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');

app.get('/', async(req,res,next)=>{
    res.render('index');
})

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
})