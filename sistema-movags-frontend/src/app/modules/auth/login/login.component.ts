// modules/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService) { }

  login() {
    this.apiService.login(this.credentials).subscribe({
      next: (res: any) => {
        console.log('Login exitoso', res);
        // Manejar token JWT y redireccionar al dashboard aquí
      },
      error: (error) => {
        console.error('Error en login', error);
      }
    });
  }
}
