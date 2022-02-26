import {Directive, ElementRef, Input, Renderer2, RendererStyleFlags2} from '@angular/core';
import {isJustifyContent, JustifyContent} from "./flex-col.directive";

@Directive({
  selector: '[flexRow]'
})
export class FlexRowDirective {

  @Input()
  flexRow: JustifyContent | string | [JustifyContent, string] = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.flexRow) {
      this.setJustify();
      return;
    }
    if (typeof this.flexRow === 'string' && isJustifyContent(this.flexRow)) {
      this.setJustify(this.flexRow);
      return;
    }
    if (typeof this.flexRow === 'string' && !isJustifyContent(this.flexRow)) {
      this.setJustify();
      this.setGap(this.flexRow);
      return;
    }
    if (Array.isArray(this.flexRow)) {
      this.setJustify(this.flexRow[0]);
      this.setGap(this.flexRow[1]);
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
    }
  }

  setGap(val: string) {
    const flags = RendererStyleFlags2.DashCase;
    this.renderer.setStyle(this.el.nativeElement, '--flex-margin', val, flags);
  }
}
