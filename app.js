const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const detailRouter = require('./routes/productdetail');
const adminRouter = require('./routes/admin');
const app = express();


const mongoose = require('mongoose');

mongoose.connect('mongodb://hung:hung12@ds211694.mlab.com:11694/ecom',{ useNewUrlParser: true })
.then( () => console.log('MongoDB Connected ...'))
.catch( err => console.log(err));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

//config session
const uuidv1 = require('uuid/v1');
app.use(session({
  genid: function(req) {
    return uuidv1(); // use UUIDs for session IDs
  },
  secret: 'hung123',
  resave: true,
  saveUninitialized: true,
  httpOnly : true,
  name : 'ssID',
  unset : 'destroy',
  cookie : { maxAge :  86400 * 1000 } //24hour
}));

app.get('*', function(req, res, next){
  res.locals.cart = req.session.cart;
  console.log(req.session.cart);
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/product-detail',detailRouter);
app.use('/admin', adminRouter);


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




app.locals.dataJson = require('./models/database.json');




module.exports = app;
