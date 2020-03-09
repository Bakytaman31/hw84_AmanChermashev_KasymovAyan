const express = require('express');
const mongoose = require('mongoose');

const users = require('./app/users');
const tasks = require('./app/tasks');

const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost/todo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

app.use('/users', users);
app.use('/tasks', tasks);

app.listen(port, () => {
        console.log(`HTTP Server started on ${port} port!`);
    });