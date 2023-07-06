import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LanguageComponent} from "./language.component";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";



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
export class LanguageModule { }
