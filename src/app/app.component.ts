import { NgTemplateOutlet } from "@angular/common";
import { afterNextRender, Component, inject } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { MenuComponent } from "./components/menu/menu.component";
import { IsMobileService } from "./services/is-mobile.service";
import { LangService } from './services/lang.service';

@Component({
  selector: 'psa-root',
  imports: [RouterOutlet, MenuComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, NgTemplateOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  date = new Date();
  isMobileService = inject(IsMobileService);
  langService = inject(LangService);

  constructor() {
    afterNextRender(() => {
      this.langService.setLanguage();
    });
  }

  get isMobile() {
    return this.isMobileService.isMobile();
  }
}
