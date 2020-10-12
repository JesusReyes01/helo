require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session')
const authCtrl = require('./authController');
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

//Auth endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout)
//Post endpoint
app.get('/api/posts/:bool', ctrl.getPosts)

app.get('/api/posts', ctrl.getAllPost)
app.get('/api/posts/single/:id', ctrl.getSinglePost)
app.post('/api/posts/create', ctrl.createPost)
app.delete('/api/posts/:id', ctrl.deletePost)




app.listen(port, () => console.log(`Helo-ing on port ${port}`));