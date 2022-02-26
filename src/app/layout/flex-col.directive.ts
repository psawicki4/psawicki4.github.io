import {Directive, ElementRef, Input, OnInit, Renderer2, RendererStyleFlags2} from '@angular/core';

export type JustifyContent = 'start' | 'center' | 'end' | 'space-between';

export function isJustifyContent(justifyContent: string): justifyContent is JustifyContent {
  return ['start', 'center', 'end', 'space-between'].indexOf(justifyContent) !== -1;
}

@Directive({
  selector: '[flexCol]'
})
export class FlexColDirective implements OnInit {

  @Input()
  flexCol: JustifyContent | string | [JustifyContent, string] = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.flexCol) {
      this.setJustify();
      return;
    }
    if (typeof this.flexCol === 'string' && isJustifyContent(this.flexCol)) {
      this.setJustify(this.flexCol);
      return;
    }
    if (typeof this.flexCol === 'string' && !isJustifyContent(this.flexCol)) {
      this.setJustify();
      this.setGap(this.flexCol);
      return;
    }
    if (Array.isArray(this.flexCol)) {
      this.setJustify(this.flexCol[0]);
      this.setGap(this.flexCol[1]);
    }
  }

  setJustify(val: string = 'start') {
    if (val === 'start') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__start');
    } else if (val === 'center') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__center');
    } else if (val === 'end') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__end');
    } else if (val === 'space-between') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__space-between');
    }
  }

  setGap(val: string) {
    const flags = RendererStyleFlags2.DashCase;
    this.renderer.setStyle(this.el.nativeElement, '--flex-margin', val, flags);
  }
}
