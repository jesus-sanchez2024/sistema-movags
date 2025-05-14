import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { ChartsComponent } from '../shared/components/charts/charts.component';
import { MapComponent } from '../shared/components/map/map.component';
import { TablesComponent } from '../shared/components/tables/tables.component';
import { ApiService } from '../servicios/api.service';
import { MatCardModule } from '@angular/material/card';
import * as L from 'leaflet';
import { Chart } from 'chart.js/auto';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports:[ MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelect,
    ChartsComponent,
    MapComponent,
    MatCardModule,
    TablesComponent,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  sector: string = 'all';
  timeRange: string = 'today';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadMap();
    this.loadCharts();
  }
  applyFilters() {
    console.log('Filtros aplicados:', this.sector, this.timeRange);
    
    // Aquí agregarás luego la lógica específica para manejar los filtros
    // por ejemplo, recargar el mapa y los gráficos con datos filtrados:
    this.loadMap();
    this.loadCharts();
  }

  // Mapa Leaflet
  loadMap() {
    const map = L.map('map').setView([21.88, -102.29], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Movilidad Aguascalientes'
    }).addTo(map);

    this.api.getZonasInteres().subscribe((zonas: any) => {
      zonas.forEach((zona: any) => {
        L.marker([zona.latitud, zona.longitud])
          .addTo(map)
          .bindPopup(`${zona.nombre}<br>${zona.descripcion}`);
      });
    });
  }

  // Gráficos ng2-charts
  loadCharts() {
    // Medios Transporte
    this.api.getMediosTransporte().subscribe((data: any) => {
      new Chart('chartMedios', {
        type: 'pie',
        data: {
          labels: data.map((d: any) => d.medio_transporte),
          datasets: [{ data: data.map((d: any) => d.cantidad) }]
        }
      });
    });

    // Tiempos promedio
    this.api.getTiemposPromedio().subscribe((data: any) => {
      new Chart('chartTiempos', {
        type: 'bar',
        data: {
          labels: data.map((d: any) => d.medio_transporte),
          datasets: [{ label: 'Minutos', data: data.map((d: any) => d.promedio_tiempo) }]
        }
      });
    });
  }
}
