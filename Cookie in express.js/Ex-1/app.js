const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('name', 'express').send('cookie set');
    console.log('Cookies: ',  req.cookies);
});

app.listen(5000);
