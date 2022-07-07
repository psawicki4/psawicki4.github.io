import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {LanguageService} from "../components/language/language.service";
import {Observable} from "rxjs";

@Component({
  selector: 'pw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  language$: Observable<string>;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.language$ = this.languageService.language$;
  }

}
