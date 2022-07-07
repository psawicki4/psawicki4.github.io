import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {CardModule} from "../components/card/card.module";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    MatButtonModule,
    TranslateModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
