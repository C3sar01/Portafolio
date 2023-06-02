import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  sendEmail() {
    if (this.contactForm.valid) {
      const nameControl = this.contactForm.get('name');
      const emailControl = this.contactForm.get('email');
      const messageControl = this.contactForm.get('message');

      if (nameControl && emailControl && messageControl) {
        const name = nameControl.value;
        const email = emailControl.value;
        const message = messageControl.value;

        // Enviar los datos al backend
        const apiUrl = 'http://localhost:8080/api/send-email';
        const requestBody = {
          name: name,
          email: email,
          message: message
        };

         this.http.post(apiUrl, requestBody, { responseType: 'text' })
          .subscribe(
            response => {
              console.log('Correo electrónico enviado exitosamente:', response);
              Swal.fire('¡Correo electrónico enviado!', 'El correo electrónico ha sido enviado exitosamente.', 'success');

            },
            error => {
              console.log('Error al enviar el correo electrónico:', error);
              Swal.fire('¡Error al enviar correo electrónico', 'error');

            }
          );

      }
    }
  }
}
