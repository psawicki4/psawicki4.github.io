import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'psa-lang-switch',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './lang-switch.component.html',
  styleUrl: './lang-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSwitchComponent implements OnInit {

  langCode: string = '';
  translate = inject(TranslateService);

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
  }

  changeLanguage(langCode: string) {
    this.translate.use(langCode);
    localStorage.setItem('langCode', langCode);
    this.langCode = langCode;
  }
}
