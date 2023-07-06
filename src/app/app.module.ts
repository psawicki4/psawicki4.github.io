import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {HomeModule} from "./home/home.module";
import {ColorsModule} from "./components/colors/colors.module";
import {EasyFlexModule} from "./layout/flex/easy-flex.module";
import {MenuModule} from "./components/menu/menu.module";
import {CardModule} from "./components/card/card.module";
import {MobileModule} from "./layout/mobile/mobile.module";
import {LanguageModule} from "./components/language/language.module";


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pl',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    EasyFlexModule,
    HomeModule,
    ColorsModule,
    LanguageModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MenuModule,
    CardModule,
    MobileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
