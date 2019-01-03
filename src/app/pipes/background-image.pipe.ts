import { Pipe, PipeTransform } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { ImageService } from '../services/image.service';

@Pipe({
  name: 'backgroundImage',
})
export class BackgroundImagePipe implements PipeTransform {
  constructor(private imageService: ImageService) {}

  transform(id: number): Observable<string> {
    if (id) {
      return this.imageService
        .findOne(id)
        .pipe(map(image => `url('${image.value}')`));
    } else {
      return of(
        `linear-gradient(rgba(230, 230, 230, 1), rgba(230, 230, 230, 1))`
      );
    }
  }
}
