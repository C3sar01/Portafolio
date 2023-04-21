import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ResumenComponent } from './resumen/resumen.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ContactoComponent,
    PortafolioComponent,
    ResumenComponent,
    
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
