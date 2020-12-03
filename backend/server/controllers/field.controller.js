const fs = require('fs-extra');
const path = require('path');
const Field = require('../models/field');
const fieldController = {};


fieldController.getFields = async (req, res) => {
    const field = await Field.find();
    res.json(field)
}

fieldController.createField = async (req,res) => {
    const field = new Field({
        name: req.body.name,
        desc: req.body.desc,
        color: req.body.color,
        imagePath: req.file.path
    });
    await field.save();
    res.json({
        'status':'Escenario creado',
        field
    });
};

fieldController.getField = async (req,res) => {
    const field = await Field.findById(req.params.id);
    res.json(field);
}

fieldController.getByName = async (req, res) => {
    const field = await Field.find({name:req.params.name});
    res.json(field);

}

fieldController.getByColor = async (req, res) => {
    const col = '#'+req.params.color;
    const field = await Field.find({color: col});
    res.json(field);
}

fieldController.editField = async (req,res) => {
    const { id } = req.params;
    const field = {
        name : req.body.name,
        desc: req.body.desc,
        color: req.body.color
    }

    const updated = await Field.findByIdAndUpdate(id, {$set: field}, {new:true});
    res.json({ status : 'Escenario actualizado', updated })

}


fieldController.deleteField = async (req,res) => {
        const field = await Field.findByIdAndRemove(req.params.id);
        if (field){
            fs.unlink(path.resolve(field.imagePath))
        }
        res.json({status:'Escenario eliminado',field});





}

module.exports = fieldController;