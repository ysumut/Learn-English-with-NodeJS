const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const routers = require('./router/routeManager');

const app = express();


app.use('/public', express.static(path.join(__dirname, '../front-end/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(ejsLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const store = new MongoDBStore({
    uri: '***',
    databaseName: 'English',
    collection: 'mySessions'
});

app.use(session({
    store,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'FN84udn8w8DN3JS',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        sameSite: true,
        secure: process.env.NODE_ENV === 'production'
    }
}));


app.use('/', routers);


app.listen(8080, function() {
  console.log("Your app is ready at 8080 port.");
});