import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observer } from 'rxjs';



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  sendEmail(): void {
    const formData = new FormData(document.getElementById('contact_form') as HTMLFormElement);
    formData.append('name', this.contactForm.get('name')?.value || '');
    formData.append('email', this.contactForm.get('email')?.value || '');
    formData.append('message', this.contactForm.get('message')?.value || '');


    const observer: Observer<any> = {
      next: (response: any) => {
        console.log(response);
        this.snackBar.open('Correo electrónico enviado correctamente', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error: any) => {
        console.log(error);
        this.snackBar.open('Error al enviar el correo electrónico', 'Cerrar', {
          duration: 3000
        });
      },
      complete: () => {}
    };

    this.emailService.sendEmail(formData).subscribe(observer);

    
  }
}
