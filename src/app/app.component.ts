import { afterNextRender, Component, inject } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LangService } from './services/lang.service';

@Component({
  selector: 'psa-root',
  imports: [RouterOutlet, MenuComponent, MatSidenavContainer, MatSidenavContent, MatSidenav, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  date = new Date();
  langService = inject(LangService);

  constructor() {
    afterNextRender(() => {
      this.langService.setLanguage();
    });
  }
}
