const multer = require('multer');

module.exports = (app) => {
    // Multer setup for handling file uploads
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            cb(null, new Date().getTime() + '-' + file.originalname);
        },
    });

    const fileFilter = (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } {
            cb(null, false);
        }
    }

    app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('pictureLink'))
}