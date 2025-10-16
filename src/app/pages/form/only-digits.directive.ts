import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[psaOnlyDigits]',
  standalone: true
})
export class OnlyDigitsDirective {

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const newKey = event.key;

    if (Number.isNaN(Number.parseInt(newKey))) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedText = clipboardData.getData('text');
      const pattern = /^\d+$/g;
      if (!pattern.test(pastedText)) {
        event.preventDefault();
      }
    }
  }
}
