/* Importación de módulos necesarios */
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');

/* Creación de una aplicación express */
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
const puerto = 5000;

// Clave secreta que servirá para codificar y decodificar la información
const claveJWT = 'AY5fT42MoPXn126QRm674KLI';
const usuarioBBDD = {usuario: 'anubedam', contrasena: '123456'};

// Ruta (endpoint) para realizar la autentificación del usuario
app.post('/api/autenticar', (req, res) => {

   console.log("body",req.body);
   
   if (req.body){
      // Nos han enviado datos
      const usuarioBody = req.body;

      if (usuarioBBDD.usuario === req.body.usuario && 
          usuarioBBDD.contrasena === req.body.contrasena){
          // Usuario correcto. Creamos el JWT
          /* const token = jwt.sign(payload, app.get('llave'), { 
               expiresIn: 1440 
            }); 
            algorithm (default: HS256)
            expiresIn: expressed in seconds or a string describing a time span zeit/ms. 
          */
          const token = jwt.sign(usuarioBody, claveJWT);
          res.status(200).json({
            status: 200,  
            usu_conectado: usuarioBody,  
            token: token
          });   

      }else{
          // El usuario contraseña proporcionado es erróneo
          res.status(403).json({
            status: 403,  
            mensaje: 'Las credenciales son incorrectas'
          });
      }
      
   }else{
      // No se ha informado usuario y contraseña (Forbidden)
      res.status(403).json({
        status: 403,  
        mensaje: 'Debe venir informado el usuario y la contraseña'
      });
   }
});    

// Creamos un listener para ejecutar la aplicación
app.listen(puerto, () => {
    console.log(`Servidor corriendo en https://localhost:${puerto}/api`)
});