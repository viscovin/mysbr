const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const expressValidator = require('express-validator');
const passport = require('passport');

const routes = require('./app_server/routes/index');
const routesApi = require('./app_api/routes/index');

const app = express();

const db = require('./app_api/models/db');

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({ secret: 'keyboard dog',
	resave: false,
	saveUninitialized: false
}));

app.use(flash());

//Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function(param,msg,value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
