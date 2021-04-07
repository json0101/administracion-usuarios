
require('./config/config.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');


const corsOpts = {
    origin: '*',  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],  
    allowedHeaders: [
      'Content-Type',
      'Auth'
    ],
  };

app.use(cors(corsOpts));
app.use(bodyParser.json());
app.use(require("./routes/usuario"));
app.use(require("./routes/login"));
app.use(require("./routes/role"));
app.use(require('./routes/aplication-route'));


app.listen(process.env.PORT, () =>
{
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
});

