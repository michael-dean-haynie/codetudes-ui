import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snippet',
})
export class SnippetPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (value.length > maxLength) {
      return value.slice(0, maxLength - 3) + '...';
    } else {
      return value;
    }
  }
}
