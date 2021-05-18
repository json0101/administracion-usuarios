const express = require("express");
const {validarJWT} = require("../middlewares/validar-jwt");

const Screen = require("../models/screen-model");

const app = express();
const router = express.Router();

router.use(validarJWT);

router.get('/resume', (req, res) => {
    
    Screen.GetAplicationsResume()
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
    Screen.GetScreens()
        .then(screens => {
            return res.json({ok: true, screens});
        })
        .catch(error => {
            return res.status(500).json({ok: false, message: error.message});
        })
});

router.post('/create', (req, res) => {
    const {screen_description,aplication_id, user_id_created, active} = req.body;
    const screen = new Screen(0, screen_description, aplication_id, active,0,0);
    console.log("creando screen");

    screen.Create()
        .then(screen => {
            return res.json({ok: true, message: "OK"});
        })
        .catch((error) =>{
            return res.status(500).json({ok: false, message: error.message});
        })
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    
    const screen = new Screen(id,"",1,0);

    screen.Delete()
        .then(sc => {
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

app.use('/screen', router);

module.exports = app;