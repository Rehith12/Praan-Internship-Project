const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const dataRouter = require('./routes/dataRoutes');

// Express Framework
const app = express();

app.enable('trust proxy');

// API  CROSS ORGIN RESOURCE SHARING Middleware
app.use(cors());

app.options('*', cors());

// HTTP Headers Protection
app.use(helmet());

// MORGAN APIrequest status code in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request rate limiter only 100 request is allowed for user and cool down perod is 1hr
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// JSON Limiter only 10kb is allowed
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// For cookies Parsing
app.use(cookieParser());

// Helps to prevent mongo injection
app.use(mongoSanitize());

// Helps to prevent cross site scripting
app.use(xss());

// Routes
app.use('/api/v1/users', userRouter); //  Goes to routes/userRoutes
app.use('/api/v1/data', dataRouter); // Goes to routes/dataRoutes

// Error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler
app.use(globalErrorHandler);

module.exports = app;
