import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardComponent} from "./components/card/card.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {TranslateService} from "@ngx-translate/core";
import {MenuComponent} from "./components/menu/menu.component";
import {LangSwitchComponent} from "./components/lang-switch/lang-switch.component";

@Component({
  selector: 'psa-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, MatToolbar, MatIcon, MatIconButton, MenuComponent, LangSwitchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  date = new Date();

  constructor(translate: TranslateService) {
    translate.setDefaultLang('pl');
    translate.use('pl');
  }
}
