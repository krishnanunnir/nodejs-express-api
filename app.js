const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const moongose = require('mongoose');

const app = express();
const cacheRouter = require('./routes/cache');
const updateLastRefreshedAt = require('./middleware/updateLastRefreshedAt');
const deleteOldercache = require('./middleware/deleteOldercache');
const clearExpiredCache = require('./middleware/clearExpiredCache');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(clearExpiredCache);
// app.use(updateLastRefreshedAt);
// app.use(deleteOldercache)
app.use('/', cacheRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const mongoDB = process.env.MONGO_DOCKER_URL;

moongose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = moongose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
