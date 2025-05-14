import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  
  login(credentials: {email: string, password: string}) {
    return this.http.post('http://localhost:3000/api/auth/login', credentials);
  }

  obtenerTrayectos() { return this.http.get('/api/trayectos'); }

  enviarEncuesta(datos: any) { return this.http.post('/api/encuesta', datos); }

  subirGPX(archivo: File) {
    const formData = new FormData();
    formData.append('gpx', archivo);
    return this.http.post('/api/subir-gpx', formData);
  }

  // Obtener zonas de interés
getZonasInteres() {
  return this.http.get('http://localhost:3000/api/zonas');
}

// Estadísticas dashboard
getMediosTransporte() {
  return this.http.get('http://localhost:3000/api/trayectos/medios-transporte');
}

getTiemposPromedio() {
  return this.http.get('http://localhost:3000/api/trayectos/tiempos-promedio');
}

getEvolucionDiaria() {
  return this.http.get('http://localhost:3000/api/trayectos/evolucion-diaria');
}

}
