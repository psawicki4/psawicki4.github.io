import { provideHttpClient } from "@angular/common/http";
import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from "@ngx-translate/core";
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix:"./assets/i18n/", suffix:".json"}),
      fallbackLang: 'pl'
    })
  ]
};
