const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const eschema = mongoose.Schema;

const eschemausuario = new eschema({
    nombre: String,
    email: String,
    telefono: String,
    idusuario: String
})

const ModeloUsuario = mongoose.model('usuarios', eschemausuario)
module.exports = router;

// Agregar Usuario
router.post('/agregarusuario', (req, res) => {
    const nuevousuario = new ModeloUsuario({
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        idusuario: req.body.idusuario
    });

    nuevousuario
        .save()
        .then(() => {
            // Enviar una respuesta JSON con un mensaje de éxito
            res.json({ message: 'Usuario agregado correctamente' });
        })
        .catch((err) => {
            // Enviar una respuesta JSON con un mensaje de error
            res.status(500).json({ error: 'Error al agregar el usuario: ' + err.message });
        });
});

// Obtener todos los Usuarios
router.get('/obtenerusuarios', (req, res) => {
  ModeloUsuario.find({})
      .then(docs => {
          res.json(docs);
      })
      .catch(err => {
          res.status(500).json({ error: 'Error al obtener los usuarios: ' + err.message });
      });

    });

// Obtener data de usuario
router.post('/obtenerdatausuario', (req, res) => {
    ModeloUsuario.find({idusuario: req.body.idusuario})
        .then(docs => {
            res.json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al obtener la data del usuario: ' + err.message });
        });
  
      });

router.post('/actualizarusuario', (req, res) => {
        
    ModeloUsuario.findOneAndUpdate({idusuario:req.body.idusuario}, {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
    })
    .then(() => {
        // Enviar una respuesta JSON con un mensaje de éxito
        res.json({ message: 'Usuario actualizado correctamente' });
    })
    .catch((err) => {
        // Enviar una respuesta JSON con un mensaje de error
        res.status(500).json({ error: 'Error al actualizar el usuario: ' + err.message });
    });
});

router.post('/borrarusuario', (req, res) => { 
    ModeloUsuario.findOneAndDelete({idusuario:req.body.idusuario}, {
    })
    .then(() => {
        // Enviar una respuesta JSON con un mensaje de éxito
        res.json({ message: 'Se borró el usuario correctamente' });
    })
    .catch((err) => {
        // Enviar una respuesta JSON con un mensaje de error
        res.status(500).json({ error: 'Error al borrar el usuario: ' + err.message });
    });
});

