import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'pw-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  date = new Date();

  @ViewChild('sidenav')
  sidenav: MatSidenav;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pl');
    translate.use('pl');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
