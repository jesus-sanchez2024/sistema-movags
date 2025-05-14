import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  standalone: true,
  imports: [NgChartsModule, MatCardModule]
})
export class ChartsComponent {
  transporteData: ChartData<'pie', number[], string> = {
    labels: ['Automóvil', 'Autobús', 'Bicicleta', 'Caminando', 'Motocicleta'],
    datasets: [{
      data: [40, 30, 10, 10, 10],
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EF5350']
    }]
  };

  transporteOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      }
    }
  };
}
