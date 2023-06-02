import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importa los componentes que deseas utilizar en las rutas

import { ContactoComponent } from './contacto/contacto.component';

// Define las rutas de tu aplicación
const routes: Routes = [

    { path: 'send-email', component: ContactoComponent } // Ruta para el formulario de contacto
  // Agrega más rutas según tus necesidades
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
