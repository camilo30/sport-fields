const express = require('express');
const router = express.Router();
const multer = require('../libs/multerImg')

const field = require('../controllers/field.controller');


//Rutas escenarios
router.get('/', field.getFields);
router.post('/',multer.single('image'),field.createField);
router.get('/:id',field.getField);
router.put('/:id',field.editField);
router.delete('/:id',field.deleteField);


module.exports = router;