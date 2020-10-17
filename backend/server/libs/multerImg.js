const multerImg = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multerImg.diskStorage({
    destination: 'public/images',
    filename: (req,file,cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});

module.exports = multerImg({storage});