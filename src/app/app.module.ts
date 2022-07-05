import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { FlexColDirective } from './layout/flex/flex-col.directive';
import { FlexRowDirective } from './layout/flex/flex-row.directive';
import { MobileOnlyDirective } from './layout/mobile/mobile-only.directive';
import { NotMobileDirective } from './layout/mobile/not-mobile.directive';
import {FormsModule} from "@angular/forms";
import {HomeModule} from "./home/home.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {NgxColorsModule} from "ngx-colors";
import { ApplicationColorsComponent } from './components/application-colors/application-colors.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FlexColDirective,
    FlexRowDirective,
    MobileOnlyDirective,
    NotMobileDirective,
    ApplicationColorsComponent
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
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
        HomeModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatListModule,
        NgxColorsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
