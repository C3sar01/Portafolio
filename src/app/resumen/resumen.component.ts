import { Component, OnInit } from '@angular/core';
import { CesarService } from '../services/cesar.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor(public cv: CesarService) { }

  ngOnInit(): void {
  }

}
