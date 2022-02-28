import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'pw-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  date = new Date();
  opened: boolean = true;

  constructor(translate: TranslateService) {
    translate.setDefaultLang('pl');
    translate.use('pl');
  }
}
