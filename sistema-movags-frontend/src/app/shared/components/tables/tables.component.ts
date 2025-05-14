import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class TablesComponent {
  displayedColumns: string[] = ['sector', 'avgTime', 'mainTransport', 'peakHours'];
  dataSource = [
    { sector: 'Manufactura', avgTime: '45 min', mainTransport: 'Autobús', peakHours: '6:00-7:30' },
    { sector: 'Conocimiento', avgTime: '28 min', mainTransport: 'Automóvil', peakHours: '8:30-9:30' }
  ];
}
