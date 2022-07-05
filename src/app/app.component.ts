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
  langCode: string;

  @ViewChild('sidenav')
  sidenav: MatSidenav;

  constructor(private translate: TranslateService) {
    this.setLanguage();
  }

  setLanguage() {
    let langCode = localStorage.getItem('langCode') ?? this.translate.getBrowserLang()?.slice(0,2);
    if (langCode !== 'pl' && langCode !== 'en') {
      langCode = 'pl';
    }
    this.translate.setDefaultLang(langCode);
    this.translate.use(langCode);
    this.langCode = langCode;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('langCode', lang);
    this.langCode = lang;
  }
}
