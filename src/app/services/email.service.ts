import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'backend-springboot-emails-production.up.railway.app/api/send-email'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  sendEmail(emailData: any) {
    return this.http.post(this.apiUrl, emailData, { responseType: 'text' }).pipe(
      map(response => {
        // Puedes realizar cualquier manipulación adicional en la respuesta del backend si es necesario
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error al enviar el correo electrónico.';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El servidor retornó un código de error
      errorMessage = `Error: ${error.status}, ${error.error}`;
    }
    return throwError(errorMessage);
  }
}
