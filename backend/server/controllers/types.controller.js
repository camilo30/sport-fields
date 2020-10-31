const userType = require ('../models/userType');
const bkgType = require ('../models/bkgtype');
const dniType = require ('../models/dnitype');
const atchType = require ('../models/atchType');
const bkgStatus = require ('../models/bkgStatus');
const role = require ('../models/role');

const typesController = {};


//Controladores para tipos de usuario
typesController.getUserTypes= async (req, res) => {
    const ut = await userType.find();
    res.json(ut);
}

typesController.getUserType = async (req, res) =>{
    const ut = await userType.findById(req.params.id);
    res.json(ut);
}

typesController.getInternalUserTypes = async (req, res) => {
    const ut = await userType.find({internal:true});
    res.json(ut);
}

typesController.deleteUserType = async (req, res) =>{
    await userType.findByIdAndRemove(req.params.id);
    res.json({status:'Tipo de usuario eliminado'});
}

//Controladores para tipos de reserva
typesController.getBkgTypes = async (req,res) => {
    const bt = await bkgType.find();
    res.json(bt);
}

typesController.getBkgType = async (req,res) => {
    const bt = await bkgType.findById(req.params.id);
    res.json(bt);
}

typesController.deleteBkgType = async (req,res) => {
    await bkgType.findByIdAndRemove(req.params.id);
    res.json({status:'Tipo de reserva eliminado'});
}

//Controladores para tipos de identificación
typesController.getDniTypes = async (req,res) => {
    const dt = await dniType.find();
    res.json(dt);
}

typesController.getDniType = async (req,res) => {
    const dt = await dniType.findById(req.params.id);
    res.json(dt);
}

typesController.deleteDniType = async (req,res) => {
    await dniType.findByIdAndRemove(req.params.id);
    res.json({status:'Tipo de identificación eliminado'});
}

//Controladores para tipos de archivos adjuntos
typesController.getAtchTypes = async (req,res) => {
    const at = await atchType.find();
    res.json(at);
}

typesController.getAtchType = async (req,res) => {
    const at = await atchType.findById(req.params.id);
    res.json(at);
}

typesController.deleteAtchType = async (req,res) => {
    await atchType.findByIdAndRemove(req.params.id);
    res.json({status:'Tipo de adjunto eliminado'});
}

//Controladores para estados de reserva
typesController.getAllBkgStatus = async (req,res) => {
    const bs = await bkgStatus.find();
    res.json(bs);
}

typesController.getBkgStatus = async (req,res) => {
    const bs = await bkgStatus.findById(req.params.id);
    res.json(bs);
}

// Controladores para roles
typesController.getRoles = async (req, res) => {
    const roles = await role.find({name: {$ne : 'admin'}});
    res.json(roles);
}



module.exports = typesController;