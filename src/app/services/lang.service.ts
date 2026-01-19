import { inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  lang = signal('pl');

  transloco = inject(TranslocoService);

  setLanguage() {
    let langCode = localStorage.getItem('langCode') ?? globalThis.navigator?.language?.slice(0, 2);
    if (langCode !== 'pl' && langCode !== 'en') {
      langCode = 'pl';
    }
    this.transloco.setActiveLang(langCode);
    this.transloco.setDefaultLang(langCode);
    this.lang.set(langCode);
  }
}
