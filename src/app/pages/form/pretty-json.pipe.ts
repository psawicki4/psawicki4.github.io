import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyJson',
})
export class PrettyJsonPipe implements PipeTransform {

  transform(value: any): string {
    console.log(JSON.stringify(value, null, 2));
    return JSON.stringify(value, null, 2).trim();
  }

}
