import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MobileOnlyDirective} from "./mobile-only.directive";
import {NotMobileDirective} from "./not-mobile.directive";



@NgModule({
  declarations: [
    MobileOnlyDirective,
    NotMobileDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MobileOnlyDirective,
    NotMobileDirective
  ]
})
export class MobileModule { }
