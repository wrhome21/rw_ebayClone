// Import Express library
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var session = require('express-session')
app.use(session({
    secret: 'currentUser',
    resave: false,
    saveUninitialized: false
}));

// Set up resources directory to server static files
app.use(express.static('resources'));

// Import path library
var path = require('path');

// Port constant
var port = 8080;

var checkAuth = function(req, res, next) {
    if (!req.session.currentUser) {
        res.sendFile(path.join(__dirname + '/login.html'));
    } else {
        next();
    }
};

// ROOT
app.get('/', checkAuth, function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    
// Logout
}).get('/logout', checkAuth, function(req, res) {

    delete req.session.currentUser;
    res.redirect('/'); 

// Show register page
}).get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + '/register.html'));

// Login
}).post('/login', function (req, res) {

    // TODO Authenticate user here
    res.redirect('/');

// Register new user
}).post('/register', function (req, res) {

    // TODO Create new user here
    res.redirect('/');
});

var server = app.listen(port, function () {
    console.log('u*Pay listening on port ' + port + '!');
});