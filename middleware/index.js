const applyHelmet = require('./helmet');
const applyBodyParser = require('./bodyParser');
const applyMorgan = require('./morgan');
const applyAuth = require('./auth');
const applyCookieParser = require('./cookieparser');
const applyMulter = require('./multer');
const applyCors = require('./cors');


module.exports = (app) => {
    applyBodyParser(app);
    applyMulter(app);
    applyCookieParser(app);
    applyAuth(app);
    applyCors(app);
    applyHelmet(app);
    applyMorgan(app);
}