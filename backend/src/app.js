const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

const session = require('express-session');
const passport_local = require('../src/passport');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
passport_local(passport);

app.use(
    session({
        secret: 'my_super_secret_secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 10800000,
            sameSite: true,
            secure: false,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', passport.authenticate('local'), (request, response) => {
    try {
        response.status(200).json(request.user);
    } catch (error) {
        console.log('error', error);
    }
});

app.listen(process.env.PORT || 3000);
