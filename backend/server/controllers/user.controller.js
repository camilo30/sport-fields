const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require ('../models/user');
const UserType = mongoose.model('UserType');
const DniType = mongoose.model('DniType');
const Role = require('../models/role')
const config = require ('../config');

const userController = {};


userController.getUsers = async (req,res) => {
    const user = await User.find().populate('role').populate('userType').populate('dniType');
    res.json(user);
}

userController.getUser = async (req,res) =>{
    const token = req.params.token;
    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded._id;

     const user = await User.findById(req.userId).populate('role').populate('userType').populate('dniType');

    /* if (!user) return res.status(401).send('Usuario no existe');
     const roles = await Role.find({_id: {$in: user.roles}})
     res.json(user);*/
    res.json(user)

}

userController.registerUser = async (req, res) => {
    const {userType, name, dniType, dni, code, phone, email, password, role} = req.body;
    let newUser;
    if(password){
        newUser= new User({
            name,
            dni,
            code,
            phone,
            email,
            password: await User.encryptPassword(password)
        })
    }else{
        newUser= new User({
            name,
            dni,
            code,
            phone,
            email,
        })
    }


    if (userType){
        const foundUT = await UserType.find({desc: {$in: userType}})
        newUser.userType = foundUT.map(userType => userType._id)
    }else{
        const ut = await UserType.find({code: 'X'})
        newUser.userType = ut.map(userType => userType._id)
    }

    if (dniType){
        const foundDT = await  DniType.find({desc: {$in: dniType}})
        newUser.dniType = foundDT.map(dniType => dniType._id)
    }

    if (role){
        const foundRole = await  Role.find({name: role})
        newUser.role = foundRole.map(role => role._id)
    } else {
        const role = await Role.findOne({name: 'user'})
        newUser.role = [role._id];
    }
/**

     //Prueba antes de guardar
     console.log(req.body);
     console.log(newUser);
     res.status(200).json({messagge:'exito'});

   */
    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, config.SECRET,{
        expiresIn: 84600 //24 horas
    });
    res.status(200).json({token});
}

userController.loginAdmin = async (req,res) => {

    const {email, password} = req.body;
    const userFound = await User.findOne({email}).populate('userType').populate('dniType').populate('role');
    if (!userFound) return res.status(401).send({message: 'Usuario no existe'});

    const matchPassword = await User.comparePassword(password, userFound.password)
    console.log(matchPassword);
    if(matchPassword){
        const token = jwt.sign({_id: userFound._id}, config.SECRET,{
            expiresIn: 84600 //24 horas
        });
        res.json({token, userFound});
    } else {
        return res.status(401).send({token: null,message:'Contraseña incorrecta'});
    }


}

userController.loginUser = async (req,res) => {
    const {email} = req.body;

    const userFound = await User.findOne({email}).populate('userType').populate('dniType').populate('role');

    if (userFound){


        if (userFound.role.name === 'user'){
            const token = jwt.sign({_id: userFound._id}, config.SECRET,{
                expiresIn: 84600 //24 horas
            });
            return res.json({token, message:'Ingreso satisfactorio'})
        }else{
            return res.json({message: 'Por favor ingrese por el módulo de administrador'});
        }

    } else{
        return res.status(401).send({message: 'Usuario no existe'});
    }


}





module.exports = userController;