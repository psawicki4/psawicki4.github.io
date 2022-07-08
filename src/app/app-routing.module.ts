import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'form-demo',
    loadChildren: () => import('./form-demo/form-demo.module').then(m => m.FormDemoModule)},
  {path: 'grid-demo',
    loadChildren: () => import('./form-demo/form-demo.module').then(m => m.FormDemoModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
