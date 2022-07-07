import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "./language.service";

@Component({
  selector: 'pw-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageComponent implements OnInit {

  langCode: string;

  constructor(private translate: TranslateService, private languageService: LanguageService) {
  }

  ngOnInit(): void {
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
    this.languageService.nextLanguage(langCode);
  }

  changeLanguage(langCode: string) {
    this.translate.use(langCode);
    localStorage.setItem('langCode', langCode);
    this.langCode = langCode;
    this.languageService.nextLanguage(langCode);
  }
}
