import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'form',
    loadComponent: () => import('./pages/form/form.component').then(mod => mod.FormComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list-page/list-page.component').then(mod => mod.ListPageComponent)
  },
  {
    path: 'grid',
    loadComponent: () => import('./pages/grid/grid.component').then(mod => mod.GridComponent)
  },
  {
    path: 'model-3d',
    loadComponent: () => import('./pages/model-3d/model-3d.component').then(mod => mod.Model3DComponent)
  }
];
