import {Directive, ElementRef, Input, Renderer2, RendererStyleFlags2} from '@angular/core';
import {isJustifyContent, JustifyContent} from "./flex-col.directive";

@Directive({
  selector: '[flexRow]'
})
export class FlexRowDirective {

  @Input()
  flexRow: JustifyContent | string = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.flexRow) {
      this.setJustify();
      return;
    }
    const params = this.flexRow.split(' ');
    if (!isJustifyContent(params[0])) {
      this.setJustify();
      this.setGap(params[0]);
    } else {
      this.setJustify(params[0]);
    }
    if (params.length === 2) {
      this.setGap(params[1]);
    }
  }

  setJustify(val: string = 'start') {
    if (val === 'start') {
      this.renderer.addClass(this.el.nativeElement, 'flex-row__start');
    } else if (val === 'center') {
      this.renderer.addClass(this.el.nativeElement, 'flex-row__center');
    } else if (val === 'end') {
      this.renderer.addClass(this.el.nativeElement, 'flex-row__end');
    } else if (val === 'space-between') {
      this.renderer.addClass(this.el.nativeElement, 'flex-row__space-between');
    } else if (val === 'space-around') {
      this.renderer.addClass(this.el.nativeElement, 'flex-row__space-around');
    } else if (val === 'space-evenly') {
      this.renderer.addClass(this.el.nativeElement, 'flex-row__space-evenly');
    }
  }

  setGap(val: string) {
    const flags = RendererStyleFlags2.DashCase;
    this.renderer.setStyle(this.el.nativeElement, '--flex-gap', val, flags);
  }
}
