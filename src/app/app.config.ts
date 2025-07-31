import { provideHttpClient } from "@angular/common/http";
import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from "@ngx-translate/core";
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix:"./assets/i18n/", suffix:".json"}),
      fallbackLang: 'pl'
    }),
    provideLuxonDateAdapter({
      parse: {
        dateInput: 'yyyy-MM-dd',
      },
      display: {
        dateInput: 'yyyy-MM-dd',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM-yyyy',
      },
    })
  ]
};
