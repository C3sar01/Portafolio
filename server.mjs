import express from 'express';
import bodyParser from 'body-parser';
import { createTransport } from 'nodemailer';
import cors from 'cors';

import { emailPassword } from './environment.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = createTransport({
    // Configura los detalles de tu servidor de correo saliente (SMTP) aquí
    host: 'smtp.gmail.com',
    port: 587,
    secure: true, // Cambia a true si tu servidor SMTP utiliza SSL
    auth: {
      user: 'cesar.cssoto@gmail.com',
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: email,
    to: 'cesar.cssoto@gmail.com',
    subject: 'Nuevo mensaje desde el formulario de contacto',
    text: `
      Nombre: ${name}
      Correo electrónico: ${email}
      Mensaje: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo.');
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).send('Correo enviado correctamente.');
    }
  });
});

const PORT = 3000; // Puerto en el que escucha el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
