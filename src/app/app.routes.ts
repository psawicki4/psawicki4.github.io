import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)},
  {path: 'form', loadComponent: () => import('./pages/form/form.component').then(mod => mod.FormComponent)},
  {path: 'list', loadComponent: () => import('./pages/list-page/list-page.component').then(mod => mod.ListPageComponent)},
  {path: 'animations', loadComponent: () => import('./pages/animations/animations.component').then(mod => mod.AnimationsComponent)},
];
