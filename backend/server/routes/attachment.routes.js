const express = require('express');
const router = express.Router();
const multer = require('../libs/multerFile')

const attachment = require('../controllers/attachment.controller');

//Rutas escenarios
router.get('/', attachment.getAttachments);
router.post('/',multer.single('file'),attachment.createAttachment);
router.get('/:id',attachment.getAttachment);
router.delete('/:id',attachment.deleteAttachment);

module.exports = router;