import express from 'express';
import nodemailer from 'nodemailer';
import { createTransport } from 'nodemailer';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';

//Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Configuración de CORS
const allowedOrigins = '*';

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));

// Configuración del transporter de Nodemailer
const transporter = createTransport({
  service: 'Gmail',
  auth: {
    user: 'cesar.cssoto@gmail.com',
    pass: ''
  }
});

// Ruta POST para enviar correos electrónicos
app.post('/send-email', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Configuración del objeto mailOptions
  const mailOptions = {
    from: 'name',
    to: 'cesar.cssoto@gmail.com',
    subject: 'Mensaje desde formulario de contacto',
    html: `
      <p>Nombre: ${name}</p>
      <p>Correo electrónico: ${email}</p>
      <p>Mensaje: ${message}</p>
    `
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({message: 'Error al enviar el correo electrónico'});
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.status(200).json({message: 'Correo electrónico enviado correctamente'});
    }
  });
});

// Inicio del servidor
app.listen(3000, () => {
  console.log('Servidor Express iniciado en el puerto 3000');
});
