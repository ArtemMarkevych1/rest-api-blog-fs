const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./init/mongodb');
const { authRoutes, categoryRoutes, fileRoutes, postRoutes, userRoutes } = require('./routes');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares');
const notFound = require('./controllers/notFound');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true, limit: '500mb' 
}));
app.use(express.json({
    limit: '500mb'
}));
app.use(morgan('dev'));
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/file', fileRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/user', userRoutes);
app.use("*", notFound);

module.exports = app;
