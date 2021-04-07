const jwt = require('jsonwebtoken');
const { response } = require('express');

const validarJWT = (req,res =response, next) => {
    const token = req.header("Auth");

    if(!token) {
        return res.status(401).json({ok: false, message: "Token no válido"});
    }
    
    try {
        const {uid} = jwt.verify(token, process.env.JWTSECUREPASSWORD);
        req.uid = uid;
        next();
    }
    catch(error) {
        res.status(401).json({ok: false, message: "Token no válido"});
    }
}

module.exports = {
    validarJWT
};