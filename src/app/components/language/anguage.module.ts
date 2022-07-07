import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LanguageComponent} from "./language.component";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    LanguageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    LanguageComponent
  ]
})
export class AnguageModule { }
