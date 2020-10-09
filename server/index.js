require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session')
const ctrl = require('./controller');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const port = SERVER_PORT;
const app = express();


//REQ.BODY
app.use(express.json());

// USER SESSION
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

//DATABASE
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

//endpoints
app.post('/api/register', ctrl.register);
app.post('/api/login', ctrl.login);

app.listen(port, () => console.log(`Memeing on port ${port}`));