import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';
  private sendGridApiKey = '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';

  constructor(private http: HttpClient) { }

  sendEmail(name: string, email: string, message: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.sendGridApiKey
    });

    const data = {
      personalizations: [
        {
          to: [{ email: 'TU_CORREO_ELECTRONICO' }],
          subject: 'Nuevo mensaje de reclutamiento'
        }
      ],
      from: { email: email, name: name },
      content: [
        {
          type: 'text/html',
          value: `<p>Nombre: ${name}</p><p>Email: ${email}</p><p>Mensaje: ${message}</p>`
        }
      ]
    };

    this.http.post(this.sendGridUrl, data, { headers }).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
}
