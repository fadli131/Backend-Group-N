const cookieParser = require('cookieparser');


module.exports = (app) => {
    app.use(cookieParser());
}