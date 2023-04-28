import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CesarService {

  profesional: any[] = [];
  educacion: any[] = [];
  testimonio: any[] = [];
  experiencia: any[] = [];
  blog: any[] = [];
  proyecto: any[] = [];



  constructor(private http: HttpClient) {
    this.CargarProfesional();
    this.CargarEducacion();
    this.CargarExperiencia();
    this.CargarProyectos();
  }

  private CargarProfesional(){
    this.http.get('https://cv-cesar-default-rtdb.firebaseio.com/Profesional.json')
      .subscribe((resp: any) => {
        this.profesional = resp;
        console.log(resp);
    });
  }

  private CargarEducacion(){
    this.http.get('https://cv-cesar-default-rtdb.firebaseio.com/Educacion.json')
      .subscribe((resp: any) => {
        this.educacion = resp;
        console.log(resp);
    });
  }

 
  private CargarExperiencia(){
    this.http.get('https://cv-cesar-default-rtdb.firebaseio.com/Experiencia.json')
      .subscribe((resp: any) => {
        this.experiencia = resp;
        console.log(resp);
    });
  }

  private CargarProyectos(){
    this.http.get('https://cv-cesar-default-rtdb.firebaseio.com/Proyectos.json')
      .subscribe((resp: any) => {
        this.proyecto = resp;
        console.log(resp);
    });
  }

}
