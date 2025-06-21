import { HttpClient, provideHttpClient } from "@angular/common/http";
import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { routes } from './app.routes';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'pl'
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
