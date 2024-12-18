import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {TranslateService} from "@ngx-translate/core";
import {LangService} from "../../services/lang.service";
import {DateAdapter} from "@angular/material/core";

@Component({
    selector: 'psa-lang-switch',
    imports: [
        MatButton
    ],
    templateUrl: './lang-switch.component.html',
    styleUrl: './lang-switch.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSwitchComponent implements OnInit {

  translate = inject(TranslateService);
  langService = inject(LangService);
  dateAdapter = inject(DateAdapter);

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
    this.langService.lang.set(langCode);
    this.setLocale();
  }

  changeLanguage(langCode: string) {
    this.translate.use(langCode);
    localStorage.setItem('langCode', langCode);
    this.langService.lang.set(langCode);
    this.setLocale();
  }

  private setLocale() {
    this.dateAdapter.setLocale(this.lang);
  }

  get lang() {
    return this.langService.lang();
  }
}
