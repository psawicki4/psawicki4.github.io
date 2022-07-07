import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColorsComponent} from "./colors.component";
import {NgxColorsModule} from "ngx-colors";
import {FormsModule} from "@angular/forms";
import {EasyFlexModule} from "../../layout/flex/easy-flex.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    ColorsComponent
  ],
  exports: [
    ColorsComponent
  ],
  imports: [
    CommonModule,
    NgxColorsModule,
    FormsModule,
    EasyFlexModule,
    TranslateModule
  ]
})
export class ColorsModule { }
