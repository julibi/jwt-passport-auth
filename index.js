const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');

// DB Setup
mongoose.connect('mongodb://localhost:27017/blub');

// Creating server by creating an instance of express
const app = express();

// Middlewares
app.use(morgan('combined')); //morgan is for loggin and debugging
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type:'*/*' })); //for parsing incoming requests into json

//determine routing
router(app);

// Server Setup
const port = process.env.PORT || 3090; 
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on port: ', port);
