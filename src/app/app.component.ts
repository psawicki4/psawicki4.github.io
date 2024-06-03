import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardComponent} from "./components/card/card.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MenuComponent} from "./components/menu/menu.component";
import {LangSwitchComponent} from "./components/lang-switch/lang-switch.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgTemplateOutlet} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {DateAdapter} from "@angular/material/core";
import {IsMobileService} from "./common-services/is-mobile.service";

@Component({
  selector: 'psa-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, MatToolbar, MatIcon, MatIconButton, MenuComponent, LangSwitchComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, MatButton, TranslateModule, NgTemplateOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  date = new Date();
  isMobileService = inject(IsMobileService);
  translate = inject(TranslateService);
  dateAdapter = inject(DateAdapter);

  ngOnInit() {
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  get isMobile() {
    return this.isMobileService.isMobile();
  }
}
