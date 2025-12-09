import { inject, Injectable, REQUEST, signal, WritableSignal } from '@angular/core';
import { UAParser } from 'ua-parser-js';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  isMobile: WritableSignal<boolean>;
  request = inject(REQUEST);

  constructor() {
    const userAgent = this.request?.headers.get('user-agent') || '';
    const uAParser = new UAParser(userAgent);
    if (userAgent !== '') {
      this.isMobile = signal(uAParser.getDevice().type === 'mobile' || uAParser.getDevice().type === 'tablet');
    } else if (globalThis) {
      const mql = globalThis.matchMedia('(max-width: 767px)');
      this.isMobile = signal(mql.matches);
      mql.onchange = (e) => this.isMobile.set(e.matches);
    } else {
      this.isMobile = signal(false);
    }
  }
}
