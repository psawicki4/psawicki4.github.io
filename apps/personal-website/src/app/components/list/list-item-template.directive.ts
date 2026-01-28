import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[listItemTemplate]',
  standalone: true,
})
export class ListItemTemplateDirective<T> {
  templateRef: TemplateRef<{ $implicit: T }> = inject(TemplateRef);

  static ngTemplateContextGuard<T>(
    _dir: ListItemTemplateDirective<T>,
    _ctx: unknown
  ): _ctx is { $implicit: T } {
    return true;
  }
}
