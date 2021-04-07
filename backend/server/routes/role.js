const express = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const Role = require("../models/role");

const app = express();
const router = express.Router();

router.use(validarJWT);

router.get('/resume', (req,res) => {
    Role.GetRolesResume()
        .then(roles => {
            return res.json({ok: true, roles});
        })
        .catch(error => {
            return res.status(500).json({ok:false, message: error.message});
        })
});

router.get('/',(req, res) => {
    
    Role.GetRoles()
        .then(roles => {
            return res.json({ok: true, roles});
        })
        .catch(error => {
            return res.status(500).json({ok: false, message: error.message});
        })
})

router.get('/:id',(req, res) => {
    const {id} = req.params;
    Role.GetRolById(id)
        .then(role => {
            return res.json({ok: true, role});
        })
        .catch(error => {
            return res.status(500).json({ok: false, message: error.message});
        });
});

router.post('/create', function(req, res) {
    const {role_description, user_id_created} = req.body;
    const role = new Role(0, role_description,user_id_created,0);

    role.Create()
        .then(role => {
            return res.json({ok: true, message: "OK"});
        })
        .catch((error) => {
            return res.status(500).json({ok: false, message: error.message});
        });
});

router.put('/update', function(req, res) {
    const { role_id,role_description, user_id_updated} = req.body;
    console.log("Entro al put",req.body);
    
    const role = new Role(role_id, role_description, 0,user_id_updated);

    role.Update()
        .then(role => {
            return res.json({ok: true, message: 'El rol ha sido modificado'});
        }) 
        .catch((error) => {
            return res.status(500).json({ok: false, message: error.message});
        })
});

router.delete('/delete/:id', function(req, res) {
    const { id } = req.params;
    
    const role = new Role(id,"",0,0);

    role.Delete()
        .then(role => {
            return res.json({ok: true, message: 'El rol ha sido eliminado'});
        })
        .catch((error) => {
            return res.status(500).json({ok: false, message: error.message});
        });
});

app.use('/role', router);

module.exports = app;