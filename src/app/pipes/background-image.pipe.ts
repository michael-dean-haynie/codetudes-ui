import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backgroundImage',
})
export class BackgroundImagePipe implements PipeTransform {
  transform(value: string): string {
    return value
      ? `url('${value}')`
      : `linear-gradient(rgba(230, 230, 230, 1), rgba(230, 230, 230, 1))`;
  }
}
