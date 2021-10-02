const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const { Server } = require('socket.io');

const { notFoundHandler, errorHandler } = require('./middleware/common/error');
const loginRouter = require('./routers/loginRouter');
const inboxRouter = require('./routers/inboxRouter');
const usersRouter = require('./routers/usersRouter');

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = new Server(server);
// const io = require('socket.io')(server);

global.io = io;

// set comment as app locals
app.locals.moment = moment;

mongoose
    .connect(process.env.DATABASE_CONNECTION)
    .then(() => {
        console.log('Connection established successfully');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/', loginRouter);
app.use('/inbox', inboxRouter);
app.use('/users', usersRouter);

app.use(notFoundHandler);

app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});
