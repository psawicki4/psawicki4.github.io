import {Directive, inject, TemplateRef} from '@angular/core';

@Directive({
  selector: '[listItemTemplate]',
  standalone: true
})
export class ListItemTemplateDirective {

  templateRef: TemplateRef<{ $implicit: any }> = inject(TemplateRef<unknown>)

}
