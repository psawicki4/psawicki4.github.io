import {Directive, ElementRef, Input, OnInit, Renderer2, RendererStyleFlags2} from '@angular/core';

export type JustifyContent = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';

export function isJustifyContent(content: string): content is JustifyContent {
  return ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'].indexOf(content) !== -1;
}

@Directive({
  selector: '[flexCol]'
})
export class FlexColDirective implements OnInit {

  @Input()
  flexCol: JustifyContent | string = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.flexCol) {
      this.setJustify();
      return;
    }
    const params = this.flexCol.split(' ');
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
      this.renderer.addClass(this.el.nativeElement, 'flex-col__start');
    } else if (val === 'center') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__center');
    } else if (val === 'end') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__end');
    } else if (val === 'space-between') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__space-between');
    } else if (val === 'space-around') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__space-around');
    } else if (val === 'space-evenly') {
      this.renderer.addClass(this.el.nativeElement, 'flex-col__space-evenly');
    }
  }

  setGap(val: string) {
    const flags = RendererStyleFlags2.DashCase;
    this.renderer.setStyle(this.el.nativeElement, '--flex-gap', val, flags);
  }
}
