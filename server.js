var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require("connect-flash");

var controllers = require("./controllers");

app.set("view engine", "vash");

// Opt into services
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('theboard'));
app.use(session({ secret: "TheBoard", resave: true, saveUninitialized: true }));
app.use(flash());

// add public static files dir
app.use(express.static(__dirname + "/public"));

// use Auth
var auth = require("./auth");
auth.init(app);

// map the routes
controllers.init(app);


app.get('/api/users', function(req, res) {
    res.set("Content-Type", "application/json");
    res.send({name: "TestName", isValid: true, group: "Admin"});
})

var server = http.createServer(app);

server.listen(3000);

var updater = require("./updater");
updater.init(server);