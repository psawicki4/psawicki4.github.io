import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { TranslocoService } from "@jsverse/transloco";
import { LangService } from "../../services/lang.service";

@Component({
  selector: 'psa-lang-switch',
  imports: [
    MatButton
  ],
  templateUrl: './lang-switch.component.html',
  styleUrl: './lang-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSwitchComponent {

  transloco = inject(TranslocoService);
  langService = inject(LangService);

  changeLanguage(langCode: string) {
    this.transloco.setActiveLang(langCode);
    localStorage.setItem('langCode', langCode);
    this.langService.lang.set(langCode);
  }

  get lang() {
    return this.langService.lang();
  }
}
