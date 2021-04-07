const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const usuarioModel = require('../models/usuarioSeq');
const {generarJWT} = require('../helpers/generar_jwt');

app.post('/login', async(req, res) => {
    const {username, password} = req.body;

    const userLogin = await usuarioModel.findOne({
        where: {
            user_name: username,
            active: true
        },
        attributes: ['user_id','user_name','password']
    });

    if(userLogin === null)
    {
        return res.status(500).json({ok: false, message: "Usuario invalido"})
    }
    
    const validPassword = bcrypt.compareSync(password, userLogin.dataValues.password);
    console.log("result", validPassword);

    if(validPassword === true) {
        const {user_id, user_name} = userLogin.dataValues;

        const token = await generarJWT(user_id+"");

        return res.json({ok:true, message: "Ok", 
                        user: {
                            user_id: user_id,
                            user_name: user_name,
                            token
                        }
                    });
    } else {
        return res.status(500).json({ok: false, message: "Usuario o contraseña incorrecta"});
    }
    
});

module.exports = app;