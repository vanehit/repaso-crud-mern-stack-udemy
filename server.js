const express = require('express');
const cors = require('cors'); 

const app = express();

//importar conexion a MongoDB
const archivoDB = require('./conexion')

//Importación de archivos de rutas y modelo de usuario
const rutausuario = require('./rutas/usuario')

//Importar body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}))

app.use(cors());

app.use('/api/usuario', rutausuario)


app.get('/', (req, res) =>{
    res.end('Bienvenidos al servidor backend Node.js Corriendo...')
})

//conectar servidor
app.listen(5000, () => {
    console.log(`El servidor está corriendo correctamente`);
   
  });
  