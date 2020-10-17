const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');


//Rutas dni
router.get('/', user.getUsers);
router.get('/getUser/:token', user.getUser);
router.post('/signup', user.registerUser);
router.post('/signin', user.loginUser);

//router.get('/:id', dni.getDni);
//router.put('/:id', dni.editDni);
//router.delete('/:id', dni.deleteDni);

module.exports = router;