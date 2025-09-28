import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {TranslateService} from "@ngx-translate/core";
import {LangService} from "../../services/lang.service";

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

  ngOnInit(): void {
    this.setLanguage();
  }

  setLanguage() {
    let langCode = localStorage.getItem('langCode') ?? this.translate.getBrowserLang()?.slice(0,2);
    if (langCode !== 'pl' && langCode !== 'en') {
      langCode = 'pl';
    }
    this.translate.setFallbackLang(langCode);
    this.translate.use(langCode);
    this.langService.lang.set(langCode);
  }

  changeLanguage(langCode: string) {
    this.translate.use(langCode);
    localStorage.setItem('langCode', langCode);
    this.langService.lang.set(langCode);
  }

  get lang() {
    return this.langService.lang();
  }
}
