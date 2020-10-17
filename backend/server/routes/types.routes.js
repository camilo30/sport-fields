const express = require('express');
const router = express.Router();

const type = require('../controllers/types.controller');

//Rutas tipos de usuario
router.get('/user', type.getUserTypes);
router.get('/user/internal', type.getInternalUserTypes);
router.get('/user/:id',type.getUserType);
router.delete ('/user/:id', type.deleteUserType);

//Rutas tipos de Reserva
router.get('/bkg', type.getBkgTypes);
router.get('/bkg/:id', type.getBkgType);
router.delete('/bkg/:id', type.deleteBkgType);

//Rutas tipos de Identificación
router.get('/dni', type.getDniTypes);
router.get('/dni/:id',type.getDniType);
router.delete('/dni/:id', type.deleteDniType);

//Rutas tipos de Archivos Adjuntos
router.get('/atch', type.getAtchTypes);
router.get('/atch/:id', type.getAtchType);
router.delete('/atch/:id', type.deleteAtchType);

//Rutas estados de Reserva
router.get('/bkgstatus', type.getAllBkgStatus);
router.get('/bkgstatus/:id', type.getBkgStatus);


module.exports = router;

