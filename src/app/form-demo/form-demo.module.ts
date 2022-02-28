import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDemoRoutingModule } from './form-demo-routing.module';
import {FormDemoComponent} from "./form-demo.component";


@NgModule({
  declarations: [
    FormDemoComponent
  ],
  imports: [
    CommonModule,
    FormDemoRoutingModule
  ]
})
export class FormDemoModule { }
