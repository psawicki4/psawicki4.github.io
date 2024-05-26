import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardComponent} from "./components/card/card.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MenuComponent} from "./components/menu/menu.component";
import {LangSwitchComponent} from "./components/lang-switch/lang-switch.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";

@Component({
  selector: 'psa-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, MatToolbar, MatIcon, MatIconButton, MenuComponent, LangSwitchComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, MatButton, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  date = new Date();
  isMobile = false;
  translate = inject(TranslateService);
  cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
      this.cd.markForCheck();
    };
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    return w < breakpoint;
  }
}
