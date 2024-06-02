import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideLuxonDateAdapter} from "@angular/material-luxon-adapter";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'pl'
    })),
    {provide: LOCALE_ID, useValue: 'pl' },
    provideLuxonDateAdapter({
      parse: {
        dateInput: 'yyyy-MM-dd',
      },
      display: {
        dateInput: 'yyyy-MM-dd',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM-yyyy',
      }
    })
  ]
};
