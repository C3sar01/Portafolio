import { Component, OnInit } from '@angular/core';
import { CesarService } from '../services/cesar.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {

  constructor(public cv: CesarService) { }

  ngOnInit(): void {
  }

}
