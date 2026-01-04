import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyPipe',
})
export class PrettyPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
