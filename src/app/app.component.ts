import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { NgTemplateOutlet } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { IsMobileService } from "./services/is-mobile.service";

@Component({
  selector: 'psa-root',
  imports: [RouterOutlet, MenuComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, NgTemplateOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  date = new Date();
  isMobileService = inject(IsMobileService);

  get isMobile() {
    return this.isMobileService.isMobile();
  }
}
