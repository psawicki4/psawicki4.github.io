import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexColDirective} from "./flex-col.directive";
import {FlexRowDirective} from "./flex-row.directive";



@NgModule({
  declarations: [
    FlexColDirective,
    FlexRowDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlexColDirective,
    FlexRowDirective
  ]
})
export class EasyFlexModule { }
