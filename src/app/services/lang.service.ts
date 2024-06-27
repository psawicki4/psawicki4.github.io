import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  lang = signal('pl');
}
