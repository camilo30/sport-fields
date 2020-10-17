const express = require('express');
const router = express.Router();

const dni = require('../controllers/dni.controller');


//Rutas dni
router.get('/', dni.getDnis);
router.post('/', dni.createDni);
router.get('/:id', dni.getDni);
router.put('/:id', dni.editDni);
router.delete('/:id', dni.deleteDni);

module.exports = router;