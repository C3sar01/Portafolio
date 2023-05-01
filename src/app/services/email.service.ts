import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiURL = 'http://localhost:3000/send-email';


 
  constructor(private http: HttpClient) { }

    sendEmail(formData: FormData): Observable<any> {
      return this.http.post<any>(this.apiURL, formData).pipe(
        catchError(error => {
          console.error(error);
          return of(null);
        })
      );
    }  
 
}
