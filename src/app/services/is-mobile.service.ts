import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  mql = globalThis.matchMedia('(max-width: 767px)');
  isMobile = signal(this.mql.matches);

  constructor() {
    this.mql.onchange = (e) => this.isMobile.set(e.matches);
  }
}
