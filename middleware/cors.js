const cors = require('cors');

module.exports = (app) => {
    // Use Cors for Global
    app.use(cors());
}