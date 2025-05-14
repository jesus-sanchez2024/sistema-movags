import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [21.882034, -102.281234],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    const routeLayer = L.polyline([
      [21.879782, -102.274563],
      [21.880183, -102.276789],
      [21.880985, -102.279345],
      [21.882034, -102.281234],
      [21.883345, -102.282456]
    ], { color: 'red' });

    routeLayer.addTo(this.map).bindPopup('Trayecto del usuario');
  }
}
