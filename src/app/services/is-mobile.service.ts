import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  isMobile = signal(this.getIsMobile());

  constructor() {
    window.onresize = () => {
      this.isMobile.set(this.getIsMobile());
    };
  }

  private getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    return w < breakpoint;
  }
}
