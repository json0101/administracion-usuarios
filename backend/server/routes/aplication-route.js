const express = require("express");
const {validarJWT} = require("../middlewares/validar-jwt");

const Aplication = require("../models/aplication-model");

const app = express();
const router = express.Router();

router.use(validarJWT);

router.get('/resume', (req, res) => {
    
    Aplication.GetAplicationsResume()
        .then(aplication => {
            return res.json({ok: true, aplication})
        })
        .catch(error => {
            return res.status(500).json({ok: false, message: error.message});
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Aplication.GetAplicationById(id)
        .then(aplication => {
            return res.json({ok: true, aplication});
        })
        .catch(error => {
            return res.status(500).json({ok: false, message: error.message});
        })
});

router.get('/', (req, res) => {
    Aplication.GetAplications()
        .then(apps => {
            return res.json({ok: true, apps});
        })
        .catch(error => {
            return res.status(500).json({ok: false, message: error.message});
        })
});

router.post('/create', (req, res) => {
    const {aplication_description, user_id_created, active} = req.body;
    const app = new Aplication(0, aplication_description, active,0);

    app.Create()
        .then(role => {
            return res.json({ok: true, message: "OK"});
        })
        .catch((error) =>{
            return res.status(500).json({ok: false, message: error.message});
        })
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    
    const app = new Aplication(id,"",1,0);

    app.Delete()
        .then(app => {
            return res.json({ok: true, message: "OK"});
        })
        .catch((error) => {
            return res.status(500).json({ok: false, message: error.message});
        });
});

router.put('/update', (req, res) => {
    const {aplication_id, aplication_description, active, user_id_updated} = req.body;

    const app = new Aplication(aplication_id, aplication_description, active, 0 , user_id_updated);
    
    app.Update()
        .then(app => {
            return res.json({ok: true, message: 'La aplicación ha sido modificada'});
        })
        .catch((error) => {
            return res.status(500).json({ok: false, message: error.message});
        })
});

app.use('/aplication', router);

module.exports = app;