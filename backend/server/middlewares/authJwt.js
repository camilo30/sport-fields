const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Role = require ('../models/role');


const verifyToken = async (req,res, next) => {
    try{
        /* if (!req.headers.authorization){
         return res.status(401).send('Peticion no autorizada');
     }*/

        const token = req.headers['authorization'];

        // const token = req.headers.authorization.split(' ')[1]
        if (token === null){
            return res.status(403).json({message: 'Petición no autorizada'})
        }

        const decoded = jwt.verify(token, config.SECRET)
        console.log('el token',token);
        req.userId = decoded._id;

        const user = await User.findById(req.userId);


        if (!user) return res.status(404).json({message: 'Usuario no encontrado'})
        //req.userID = payload._id;
        next();
    } catch (error){
        return res.status(401).json({message: 'Petición no autorizada'})
    }


}

const isDirector = async (req,res,next) => {
   try{
       const user = await User.findById(req.userId)
       const roles = await Role.find({_id: {$in: user.roles}})
       for (let i = 0; i < roles.length; i++){

           if(roles[i].name === 'director'){
               next();
               return;
           }
       }
       return res.status(403).json({message: 'Requiere el rol de director'})
   } catch (e){
       res.status(404).json({message:'No encontrado'})
   }
}

module.exports ={verifyToken, isDirector}