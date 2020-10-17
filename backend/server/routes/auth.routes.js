

userController.registerUser = async (req, res) => {
    const {userType, name, dniType, dni, code, phone, email, password} = req.body;

    const newUser={
        userType,
        name,
        dniType,
        dni,
        code,
        phone,
        email,
        password: await User.encryptPassword(password)
    }
    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, 'secretKey')

    res.status(200).json({token, newUser});
}

userController.loginUser = async (req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) return res.status(401).send('Usuario no existe');
    if(user.password !== password) return res.status(401).send('Contraseña incorrecta');

    const token = jwt.sign({_id: user._id}, 'secretKey')
    return res.status(200).json({token, user})
}
