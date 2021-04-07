const express = require('express');
const app = express();
const router = express.Router();
const User = require("../models/user");
const { validarJWT } = require("../middlewares/validar-jwt");

router.use(validarJWT);

router.get('/', function (req, res) {
    User.GetUsers()
      .then(users => {
        return res.json({ok: true, users});
      })
      .catch(error => {
        return res.status(500).json({ok:false ,message: error.message});
      });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    console.log("en obtener el usuario",id);
    User.GetUserById(id)
      .then(user => {
        return res.json({ok: true, user});
      })
      .catch(error => {
        return res.status(500).json({ok: false, message: error.message});
      });
});

router.post('/create', function (req, res) {
  console.log("Req",req.body);
    const {user_name, role_id, password, passwordConfirm,active, user_id_created} = req.body;
    const user = new User(0,user_name, role_id, password, passwordConfirm, active,user_id_created,0);
    
    user.Create()
      .then(user =>{
        return res.json({ok:true,message:"OK"});
      })
      .catch((error) => {        
        return res.status(500).json({ok: false,message: error.message});
      });
    
});

router.put('/update', function(req, res) {
    const {user_id, user_name, role_id, active, user_id_updated} = req.body;
    const user = new User(user_id, user_name, role_id, "","", active, 0, user_id_updated);

    user.Update()
      .then(user => {
        return res.json({ok: true, message: "Usuario modificado"});
      })
      .catch((error) => {
        return res.status(500).json({ok: false, message: error.message});
      });

});

router.delete('/delete/:id', function(req, res) {
  const {id} = req.params;
  const user = new User(id, "", 0,"","",0,0,0);

  user.Delete()
    .then(m => {
      return res.json({ok: true, m})
    })
    .catch((error) => {
      return res.status(500).json({ok: false, message: error.message});
    })
});

app.use('/user', router);

module.exports = app;