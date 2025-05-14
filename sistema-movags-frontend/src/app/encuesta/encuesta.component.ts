import { Component } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
  encuesta = {
    usa_transporte: '',
    frecuencia: '',
    opinion_movilidad: ''
  };
  
  constructor(private api: ApiService) {}
  
  enviarEncuesta() {
    this.api.enviarEncuesta(this.encuesta)
      .subscribe(() => alert('Encuesta enviada con éxito'));
  }
}


