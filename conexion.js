const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crudmernstack');



const objetoDb = mongoose.connection;

objetoDb.on('connected', () =>{console.log('Conexión correcta a MondoDB')})
objetoDb.on('Error', () =>{console.log('Error en la conexión a MondoDB')})

module.exports = mongoose;