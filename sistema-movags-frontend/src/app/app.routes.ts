import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirigir claramente a la página de login por defecto
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Rutas principales claramente definidas
  { 
    path: 'auth/login', 
    loadComponent: () => import('./modules/auth/login/login.component').then(c => c.LoginComponent) 
  },
  { 
    path: 'auth/register', 
    loadComponent: () => import('./modules/auth/register/register.component').then(c => c.RegisterComponent) 
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./modules/dashboard/main/main.component').then(c => c.MainComponent) 
  },

  // Cualquier ruta desconocida regresa claramente al login
  { path: '**', redirectTo: 'auth/login' }
];
