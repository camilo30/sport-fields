const fs = require('fs-extra');
const path = require('path');
const Attachment = require('../models/attachment');
const mongoose = require('mongoose');
const AtchType = mongoose.model('AtchType');
const attachmentController = {}

attachmentController.getAttachments = async (req, res) => {
    const attachment = await Attachment.find();
    res.status(200).send(attachment);
}

attachmentController.createAttachment = async (req,res) => {
    const { atchtype } = req.body;
    const newAttachment = new Attachment({
        desc: req.body.desc,
        path: req.file.path
    });
    if (atchtype){
        const foundAT = await AtchType.find({desc: atchtype})
        newAttachment.atchType = foundAT.map(atchtype => atchtype)
    }

    const savedAttachment = await newAttachment.save();
    res.status(200).send('Attachment adjunto');
}

attachmentController.getAttachment = async (req, res) => {
    const attachment = await Attachment.findById(req.params.id);
    res.status(200).send(attachment);
}

attachmentController.deleteAttachment = async (req, res) => {
    const attachment = await Attachment.findByIdAndRemove(req.params.id);
    if(attachment){
        fs.unlink(path.resolve(attachment.path));
    }
    res.status(200).send('Archivo addjunto eliminado');
}

module.exports = attachmentController;
