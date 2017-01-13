var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer();

var index = require('./routes/index');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', index);

app.post('/submission', upload.single('doc'), function(req, res) {
  var receivedFile = req.body;
  var receivedDoc = req.file;
  //console.log(receivedDoc);
  res.send("You submitted " + receivedDoc.size);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
