import { afterNextRender, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  isMobile = signal(false);

  constructor() {
    afterNextRender(() => {
      const mql = globalThis.matchMedia('(max-width: 767px)');
      mql.onchange = (e) => this.isMobile.set(e.matches);
    });
  }
}
