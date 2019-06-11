var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var navigationRouter = require('./routes/navigation');
var usersRouter = require('./routes/users');
var communication_addRouter = require('./routes/communication_add');
var communication_listRouter = require('./routes/communication_list');
var communication_editRouter = require('./routes/communication_edit');
var users_listRouter = require('./routes/users_list');
var examinetRouter = require('./routes/communication_examine');
var commentRouter = require('./routes/comment_list');
var task_addRouter = require('./routes/task_add');
var task_listRouter = require('./routes/task_list');
var uploadRouter = require('./routes/upload');
var imgRouter = require('./routes/img');
var apiRouter = require('./routes/api');
var information_addRouter = require('./routes/information_add');
var information_listRouter = require('./routes/information_list');
var socketio = require('./socket.io/index');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/navigation', navigationRouter);
app.use('/communication_add', communication_addRouter);
app.use('/communication_list', communication_listRouter);
app.use('/communication_edit', communication_editRouter);
app.use('/users_list', users_listRouter);
app.use('/communication_examine', examinetRouter);
app.use('/comment_list', commentRouter);
app.use('/task_add', task_addRouter);
app.use('/task_list', task_listRouter);
app.use('/upload', uploadRouter);
app.use('/img', imgRouter);
app.use('/api', apiRouter);
app.use('/information_add', information_addRouter);
app.use('/information_list', information_listRouter);
app.use('/socket', socketio);



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
