import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)},
  {path: 'form', loadComponent: () => import('./pages/form/form.component').then(mod => mod.FormComponent)},
  {path: 'test', loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)},
];
