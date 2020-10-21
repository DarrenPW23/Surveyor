const express = require('express')
const path = require('path')
const hbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const Router = require('./app/routes')
const UserController = require('./app/controllers/UserController')

const app = express()
const port = process.env.port || 3000

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/app/views/layouts',
    partialsDir: [
        __dirname + '/app/views/partials',
    ],
    helpers
}));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.png'));

app.use(passport.initialize());
app.use(passport.session());

app.use(Router)

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        UserController.get({ email })
            .then((result) => {
                if (typeof result.error !== 'undefined') done(error)

                if (typeof result.data === 'undefined' || result.data.length === 0) {
                    done(null, false);
                } else {
                    const hash = result.data.password;

                    bcrypt.compare(password, hash, (err, response) => {
                        if (response === true) {
                            return done(null, { user_id: result.index });
                        } else {
                            done(null, false);
                        }
                    });
                }
            })
    })
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

app.on('error', (err) => {
    if (err.syscall !== 'listen') throw err

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errs with friendly messages
    switch (err.code) {
        case 'EACCES':
            console.err(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.err(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw err
    }
})