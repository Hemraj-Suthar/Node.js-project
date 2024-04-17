const express = require('express');
const session = require('express-session');

const app = express();

// Configure express-session middleware
app.use(session({
    secret: 'mySecretKey', // A secret key used to sign the session ID cookie
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false // Forces a session that is "uninitialized" to be saved to the store
}));

// Route to set session data
app.get('/set-session', (req, res) => {
    req.session.user = { username: 'john_doe' };
    res.send('Session data has been set');
    console.log('Session data has been set');
});

// Route to get session data
app.get('/get-session', (req, res) => {
    if (req.session.user) {
        res.send('Session user: ' + req.session.user.username);
    } else {
        res.send('No session data found');
    }
});

// Route to destroy session
app.get('/destroy-session', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.send('Error destroying session');
        } else {
            res.send('Session destroyed successfully');
        }
    });
});

const port = 5050;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
