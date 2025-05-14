/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../servicios/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.credentials).subscribe({
      next: (response: any) => {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.token); // Guarda el JWT
        this.router.navigate(['/dashboard']);          // Redirige al Dashboard
      },
      error: (error) => {
        alert('Error en login: Usuario o contraseña incorrectos.');
        console.error('Error en login', error);
      }
    });
  }
}
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../servicios/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  rememberMe = false;

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.credentials).subscribe({
      next: (response: any) => {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.token);
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.credentials.email);
        }
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        alert('Error en login: Usuario o contraseña incorrectos.');
        console.error('Error en login', error);
      }
    });
  }

  ngOnInit() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.credentials.email = rememberedEmail;
      this.rememberMe = true;
    }
  }
}