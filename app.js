const express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy,
    bcrypt = require('bcrypt-nodejs'),
    session = require('express-session'),
    // configAuth = require('./config/auth'),
    mysqlAuth = require('./config/mysqlAuth').mysqlAuth

let pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlAuth.host,
    user: mysqlAuth.user,
    password: mysqlAuth.password,
    database: mysqlAuth.db,
    port: mysqlAuth.port
});

app.use(require("express-session")({
    secret: "Secret text 1234",
    resave: true,
    saveUninitialized: false,
}));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

authPassportLogic = require('./middleware/authPassportLogic');

// Routes
let authenticationRoutes = require('./routes/authentication');
let indexRoutes = require('./routes/indexRoutes');
let adminRoutes = require('./routes/adminRoutes');
let studentRoutes = require('./routes/studentRoutes');
let transactionRoutes = require('./routes/transactionRoutes');
let rankRoutes = require('./routes/rankRoutes');
let classRoutes = require('./routes/classRoutes');
app.use("/db",authenticationRoutes);
app.use("/db",indexRoutes);
// app.use("/db",adminRoutes);
app.use("/db",studentRoutes);
app.use("/db",transactionRoutes);
app.use("/db",rankRoutes);
app.use("/db",classRoutes);



//SQL middleware file
// sqlExec = require('./middleware/sqlMiddleware')
authenticationMiddleware = require('./middleware/authentication');


app.listen("9812", () => {
    console.log("Server started");
})