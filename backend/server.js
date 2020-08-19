const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const uri = keys.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection establish successfully');
});

const usersRouter = require('./routes/api/users');
const segmentsRouter = require('./routes/api/segments');
const textsRouter = require('./routes/api/texts');
const directoriesRouter = require('./routes/api/directories');

app.use('/api/users', usersRouter);
app.use('/api/users', segmentsRouter);
app.use('/api/users', textsRouter);
app.use('/api/users', directoriesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});