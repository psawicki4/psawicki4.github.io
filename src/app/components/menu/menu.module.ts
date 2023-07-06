import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {CardModule} from "../card/card.module";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    MatListModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
