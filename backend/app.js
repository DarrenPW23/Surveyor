const express = require('express');
const app = express();
const Router = require('./app/routes');
const port = process.env.port || 3000;

app.use(Router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
app.on('error', (err) => {
    if (err.syscall !== 'listen') {
        throw err;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errs with friendly messages
    switch (err.code) {
        case 'EACCES':
            console.err(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.err(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw err;
    }
});