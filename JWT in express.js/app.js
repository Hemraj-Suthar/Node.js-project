const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const secretKey = 'secretKey';

app.use(bodyParser.json());

// Dummy users (In real application, this should be stored in a database)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user in the array
    const user = users.find(u => u.username === username && u.password === password);
    console.log(user);
    if (user) {
        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ status: "token is sucessfully generated!", token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.post('/profile', authenticateToken, (req, res) => {
    const { user } = req;
    res.json({ message: 'Protected route accessed successfully', user });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




// verify token in route
// app.post('/profile', (req, res) => {
//     const token = req.headers['authorization'];

//     if (typeof token !== 'undefined') {
//         jwt.verify(token, secretKey, (err, authData) => {
//             if (err) {
//                 res.status(403).json({
//                     result: 'invalid Token'
//                 });
//             } else {
//                 res.json({
//                     message: 'profile accessed',
//                     authData
//                 });
//             }
//         });
//     } else {
//         res.status(401).json({
//             result: 'Token is not provided'
//         });
//     }
// });




// first verify token in middlware function and send res in route 
// app.post('/profile', verifyToken, (req, res) => {
//     const { token } = req; // Token extracted by the verifyToken middleware
//     if (token) {
//         res.json({
//             message: 'profile accessed',
//             authData: token.authData // Use authData from the verified token
//         });
//     } else {
//         res.status(403).json({
//             result: 'invalid Token'
//         });
//     }
// });

// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
//     if (typeof token !== 'undefined') {
//         jwt.verify(token, secretKey, (err, authData) => {
//             if (err) {
//                 req.token = null; // Invalid token
//             } else {
//                 req.token = { authData }; // Valid token with authenticated data
//             }
//             next();
//         });
//     } else {
//         req.token = null; // No token provided
//         next();
//     }
// }


// app.post('/profile', authenticateToken, (req, res) => {
//     const { user } = req;
//     res.json({ message: 'Protected route accessed successfully', user });
// });

// // Middleware to authenticate token
// function authenticateToken(req, res, next) {
//     const token = req.headers['authorization'];

//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, secretKey, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }


// app.post('/login', (req, res) => {
//     const user = {
//         id: 1,
//         user: 'ram',
//         email: "abc@test.com"
//     }
//     jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
//         if (err) {
//             res.status(500).json({ status: 'Failed to generate token' });
//         } else {
//             res.json({ status: "token is sucessfully generated!", token });
//         }
//     });
// });