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
  
  { path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
  {
     path: 'encuesta', loadComponent: () => import('./encuesta/encuesta.component').then(m => m.EncuestaComponent) 
    },
  {
     path: 'subir-gpx', loadComponent: () => import('./subir-gpx/subir-gpx.component').then(m => m.SubirGpxComponent) 
    },

  // Cualquier ruta desconocida regresa claramente al login
  { path: '**', redirectTo: 'auth/login' }
];
