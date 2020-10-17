const multerFile = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multerFile.diskStorage({
    destination: 'public/files',
    filename: (req,file,cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});

module.exports = multerFile({storage});