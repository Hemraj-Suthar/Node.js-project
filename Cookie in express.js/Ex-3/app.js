const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(session({
    secret: 'mySecret', // Used to sign the session ID cookie
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
}));

// Route for handling user login
app.post('/login', (req, res) => {
    // Validate login credentials
    if (req.body.username === 'example_user' && req.body.password === 'password') {
        // Create session for the authenticated user
        req.session.authenticated = true;
        res.send('Login successful');
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Route for accessing protected resources
app.get('/protected', (req, res) => {
    // Check if user is authenticated
    if (req.session.authenticated) {
        res.send('Welcome to protected resource');
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});














// Route to set a cookie
app.get('/set-cookie', (req, res) => {
    // Set a cookie named "user" with value "john"
    res.cookie('user', 'john').send('Cookie is set');
});

// Route to demonstrate sessions
app.get('/set-session', (req, res) => {
    // Set session data
    req.session.user = 'jane';
    res.send('Session is set');
});

app.get('/get-session', (req, res) => {
    // Retrieve session data
    const user = req.session.user;
    if (user) {
        res.send('Session user: ' + user);
    } else {
        res.send('No session found');
    }
});