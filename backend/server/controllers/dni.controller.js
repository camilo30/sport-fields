const Dni = require ('../models/dnitype');
const dniController = {};

dniController.getDnis= async (req, res) => {
    const dni = await Dni.find();
    res.json(dni);
}

dniController.createDni = async (req, res) => {
    const dni = new Dni({
        code: req.body.code,
        desc: req.body.desc
    });
    await dni.save();
    res.json({
        'status':'Tipo de identificación creada'
    });
}

dniController.getDni = async (req, res) =>{
    const dni = await Dni.findById(req.params.id);
    res.json(dni);
}

dniController.editDni = async (req, res) =>{
    const { id } = req.params;
    const dni = {
        code : req.body.code,
        desc: req.body.desc
    }
    await Dni.findByIdAndUpdate(id, {$set: dni}, {new: true});
    res.json({status:'Tipo de identificación actualizado'});
}

dniController.deleteDni = async (req, res) =>{
    await Dni.findByIdAndRemove(req.params.id);
    res.json({status:'Tipo de identificación eliminado'});
}

module.exports = dniController;