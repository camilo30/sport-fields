const express = require('express');
const router = express.Router();
const multer = require('../libs/multerImg')

const field = require('../controllers/field.controller');


//Rutas escenarios

router.post('/',multer.single('image'),field.createField);

router.get('/nameSearch/:name', field.getByName);
router.get('/colorSearch/:color', field.getByColor);
router.get('/field/:id',field.getField);
router.get('/all', field.getFields);
router.put('/:id',field.editField);
router.delete('/:id',field.deleteField);


module.exports = router;