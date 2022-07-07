import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languageSource = new ReplaySubject<string>(1);
  language$ = this.languageSource.asObservable();

  constructor() { }

  nextLanguage(language: string) {
    this.languageSource.next(language)
  }
}
