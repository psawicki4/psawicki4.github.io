import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from "./components/menu/menu.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgTemplateOutlet} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {DateAdapter} from "@angular/material/core";
import {IsMobileService} from "./services/is-mobile.service";

@Component({
  selector: 'psa-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, NgTemplateOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  date = new Date();
  isMobileService = inject(IsMobileService);
  dateAdapter = inject(DateAdapter);

  ngOnInit() {
    this.dateAdapter.getFirstDayOfWeek = () => 1;
  }

  get isMobile() {
    return this.isMobileService.isMobile();
  }
}
