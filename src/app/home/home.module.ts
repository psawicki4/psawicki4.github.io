import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {CardModule} from "../components/card/card.module";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    MatButtonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
