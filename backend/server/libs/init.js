const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserType = mongoose.model('UserType');
const DniType = mongoose.model('DniType');
const AtchType = mongoose.model('AtchType');
const BkgStatus = mongoose.model('BkgStatus');
const BkgType = mongoose.model('BkgType');
const Role = mongoose.model('Role');

init = async(req, res) => {
   try{
       let count = 0;

       // Crear Tipos de Usuario
       count = await UserType.estimatedDocumentCount()
       if ( count === 0){
          await UserType.create({code:'E',desc:'Estudiante', internal:true, public:false})
               .catch(err => console.log('UserType: E ya existe, no creado'));
          await UserType.create({code:'F',desc:'Funcionario', internal:true, public: false})
               .catch(err => console.log('UserType: F ya existe, no creado'));
          await UserType.create({code:'X',desc:'Externo', internal:false, public:false})
               .catch(err => console.log('UserType: X ya existe, no creado'));
       }

       // Crear Tipos de Dni
       count = await DniType.estimatedDocumentCount()
        if (count === 0){
            await DniType.create({code:'CC',desc:'Cédula de Ciudadanía'})
                .catch(err => console.log('DniType: CC ya existe, no creado'));
            await DniType.create({code:'TI',desc:'Tarjeta de Identidad'})
                .catch(err => console.log('DniType: TI ya existe, no creado'));
            await DniType.create({code:'CE',desc:'Cédula de Extranjería'})
                .catch(err => console.log('DniType: CE ya existe, no creado'));
        }

       // Crear Tipos de Reserva
       count = await BkgType.estimatedDocumentCount()
       if (count === 0){
           await BkgType.create({code:'A',desc:'Alquiler'})
               .catch(err => console.log('BkgType: R ya existe, no creado'));
           await BkgType.create({code:'P',desc:'Préstamo'})
               .catch(err => console.log('BkgType: P ya existe, no creado'));
           await BkgType.create({code:'E',desc:'Entrenamiento'})
               .catch(err => console.log('BkgType: E ya existe, no creado'));
           await BkgType.create({code:'U',desc:'Uso Institucional'})
               .catch(err => console.log('BkgType: U ya existe, no creado'));
       }

       // Crear Estados de Reserva
       count = await BkgStatus.estimatedDocumentCount()
       if (count === 0){
           await BkgStatus.create({code:'S',name:'Solicitada', desc:'Reserva solicitada, el administrador validará disponibilidad.'})
               .catch(err => console.log('BkgStatus: S ya existe, no creado'));
           await BkgStatus.create({code:'P',name:'Pre-aprobada', desc:'Existe disponibilidad para su reserva, por favor cargar la documentación requerida'})
               .catch(err => console.log('BkgStatus: P ya existe, no creado'));
           await BkgStatus.create({code:'E',name:'En revisión',desc:'Documentación en revisión del administrador'})
               .catch(err => console.log('BkgStatus: E ya existe, no creado'));
           await BkgStatus.create({code:'A',name:'Aprobada',desc:'Documentación válida, reserva aprobada.'})
               .catch(err => console.log('BkgStatus: A ya existe, no creado'));
           await BkgStatus.create({code:'R',name:'Rechazada',desc:'No existe disponibilidad de horario o la documentación adjunta no es válida o está incompleta.'})
               .catch(err => console.log('BkgStatus: R ya existe, no creado'));
           await BkgStatus.create({code:'C',name:'Cancelada',desc:'Reserva cancelada por el usuario.'})
               .catch(err => console.log('BkgStatus: C ya existe, no creado'));
       }

       // Crear Tipos de Adjunto
       count = await AtchType.estimatedDocumentCount()
       if (count === 0){
           await AtchType.create({code:'S',desc:'Solicitud de préstamo'})
               .catch(err => console.log('AtchType: S ya existe, no creado'));
           await AtchType.create({code:'A',desc:'Listado de asistentes'})
               .catch(err => console.log('AtchType: A ya existe, no creado'));
       }

       // Crear Tipos de Rol
       count = await Role.estimatedDocumentCount()
       if (count === 0){
           await Role.create({name:'user'})
               .catch(err => console.log('Role: user ya existe, no creado'));
           await Role.create({name:'director'})
               .catch(err => console.log('Role: director ya existe, no creado'));
           await Role.create({name:'instructor'})
               .catch(err => console.log('Role: instructor ya existe, no creado'));
           await Role.create({name:'admin'})
               .catch(err => console.log('Role: admin ya existe, no creado'));
       }

        // Crear rol admin

       count = await User.estimatedDocumentCount()

       if ( count === 0){
           let aux = await UserType.find({ code: 'F' })
           const userType = aux.map(userType => userType._id);
           const name = 'Admin'
           aux = await DniType.find({ code: 'CC' })
           const dniType = aux.map(dniType => dniType._id)
           const dni = '0000000'
           const phone = '0000000000'
           const email = 'admin@admin.com'
           const password = await User.encryptPassword('escenarios.2020')
           aux = await Role.find({name:'admin'})
           const role = aux.map(roles => roles._id)

           let newUser = User
           newUser = {userType, name, dniType, dni, phone, email, password, role};

           await User.create(newUser)

       }
   }catch (error) {
       console.log(error);
   }
}

module.exports = init;

