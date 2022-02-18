//All imports needed
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
//const expressHbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const mongoose = require('./database/models/connection');
const User = require('./database/models/user');

//Routes imports
const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const listRouter = require('./routes/list');

//Connecting to DB
user_url = 'mongodb://0.0.0.0/user-db';
//mongoose.connect(user_url);

//module.exports = user_conn;
//module.exports = list_conn;

//Creation of Express App and Port Selection
const app = new express();
const server = app.listen(5000, function() {
    console.log("Listening at port 5000...")
});

app.engine('hbs', engine({
    extname:'hbs',
    defaultview: 'main',
    layoutDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
}));

/*var hbs = expressHbs.create({});*/

//app.handlebars.registerHelper('everyNth', function (context, every, options) {
//    var fn = options.fn, inverse = options.inverse;
//    var ret = "";
//    if (context && context.length > 0) {
//        for (var i = 0, j = context.length; i < j; i++) {
//            var modZero = i % every === 0;
//            ret = ret + fn(_.extend({}, context[i], {
//                isModZero: modZero,
//                isModZeroNotFirst: modZero && i > 0,
//                isLast: i === context.length - 1
//            }));
//        }
//    } else {
//        ret = inverse(this);
//    }
//    return ret;
//});

//Setting the view engine to the express-handlebars engine created
app.set('view engine', 'hbs');

//Making CSS work or Serve static files
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/list/public'));
//Configuration for Handling API endpoint data
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

////const mongoose = require('mongoose');
//const databaseURL = 'mongodb://0.0.0.0/user-db';
//
//const options = { useNewUrlParser: true,
//  useUnifiedTopology: true,
//  useFindAndModify: false };
//
//mongoose.connect(databaseURL, options);

//Server configuration
app.use(session({
  secret: 'pinakamalupetnaapp',
  store: MongoStore.create({mongoUrl: user_url }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Flash
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use('/', authRouter); //Login/registration routes
app.use('/', homeRouter); //Home router
app.use('/', listRouter);


//app.get('/', function(req,res) {
//    res.sendFile(__dirname + '\\' + 'index.html');
//});
//
//app.get('/register.html', function(req,res) {
//    res.sendFile(__dirname + '\\' + 'register.html');
//})
//
//app.post('/login-attempt', function(req,res) {
//    var username = req.body.uname
////    var pword = res.body.pw
////    res.send(username + ' Submitted Successfully');
//    res.sendFile(__dirname + '\\' + 'home.html');
//});
//
//app.post('/register-attempt', function(req,res) {
//    User.create(req.body, (error,user) => {
//        res.redirect('/');
//    })
//});

