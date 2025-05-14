import { Component } from '@angular/core';

@Component({
  selector: 'app-subir-gpx',
  standalone: true,
  imports: [],
  templateUrl: './subir-gpx.component.html',
  styleUrl: './subir-gpx.component.scss'
})
export class SubirGpxComponent {
  archivoGPX!: File;

//constructor(private api: ApiService) {}

seleccionarArchivo(event: any) {
  this.archivoGPX = event.target.files[0];
}

/*subirArchivo() {
  if (this.archivoGPX) {
    this.api.subirGPX(this.archivoGPX)
      .subscribe(() => alert('Archivo GPX subido con éxito'));
  } else {
    alert('Selecciona un archivo GPX primero.');
  }
}*/

}
