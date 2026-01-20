import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[reverseMail]',
  standalone: true,
})
export class ReverseMailDirective {
  constructor(private readonly el: ElementRef) {}

  @HostListener('copy', ['$event'])
  copyMail(e: ClipboardEvent) {
    e.preventDefault();
    const reversedText = this.revertText(this.el.nativeElement.innerText);
    navigator.clipboard.writeText(reversedText);
  }

  @HostListener('click')
  navigate() {
    const reversedText = this.revertText(this.el.nativeElement.innerText);
    globalThis.location.href = 'mailto:' + reversedText;
  }

  private revertText(text: string) {
    let reversedText = '';
    for (const i of text) {
      reversedText = i + reversedText;
    }
    return reversedText;
  }
}
