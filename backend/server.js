const express = require('express');
// Body parser apparently not needed in newer versions of express
// const bp = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { Schema } = mongoose;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware

app.use(cors());
app.use(morgan('tiny'));
// app.use(bp.json());
app.use(express.json());

// MongoDB

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const { connection } = mongoose;

connection.once('open', () => {
    console.log('MongoDB Atlas connection established successfully');
});

// Routers

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});