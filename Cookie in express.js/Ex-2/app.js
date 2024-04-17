const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(cookieParser());
app.use(session({
    secret: 'mySecret', // Used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
}));

app.get('/set-cookie', (req, res) => {
    res.cookie('user1', 'ramesh');
    res.cookie('user2', 'ashok');
    res.cookie('user3', 'rajveer');
    res.cookie('title', 'geeksforgeeks');
    res.json({ status: 'Cookie is set' })
});

app.get('/clear-cookie', function (req, res) {
    res.clearCookie('user');
    res.clearCookie('title');
    res.send("Cookie cleared");
});


app.get('/set-session', (req, res) => {
    req.session.user = 'kamlesh';
    res.json({status: 'Session is set'});
});


app.get('/get-session', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.send('Session user: ' + user);
    } else {
        res.send('No session found');
    }
});

const  PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// app.get('/set-cookie', (req, res) => {
//     const cookies = [
//         { name: 'name', value: 'ramesh' },
//         { name: 'name', value: 'ram' },
//         { name: 'name', value: 'neha' },
//         { name: 'name', value: 'saroj' }
//     ];

//     cookies.forEach(cookie => {
//         res.cookie(cookie.name, cookie.value);
//     });
// });

