import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {CardModule} from "../components/card/card.module";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {TranslateModule} from "@ngx-translate/core";
import {MobileModule} from "../layout/mobile/mobile.module";



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    MatButtonModule,
    TranslateModule,
    MobileModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
