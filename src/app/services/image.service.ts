import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Image } from '../models/image.model';
import { HttpClient } from '@angular/common/http';
import { ServiceHelpers } from './service-helpers';
import { tap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private ENDPOINT = `${environment.backendApiBase}/images`;
  cachedImages = {};

  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<Image> {
    const cachedImage = this.getImageFromCache(id);
    return cachedImage
      ? of(cachedImage)
      : ServiceHelpers.pipeJsonToModel<Image>(
          this.http.get<Image>(`${this.ENDPOINT}/${id}`),
          Image
        );
  }

  create(image: Image): Observable<Image> {
    return ServiceHelpers.pipeJsonToModel<Image>(
      this.http.post<Image>(`${this.ENDPOINT}`, image, {}),
      Image
    ).pipe(tap(savedImage => this.cacheImage(savedImage)));
  }

  delete(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.ENDPOINT}/${id}`)
      .pipe(tap(deletedId => this.invalidateCachedImage(deletedId)));
  }

  private cacheImage(image: Image): Image {
    this.cachedImages[image.id] = image;
    return image;
  }

  private invalidateCachedImage(id: number): number {
    console.log('IN THE INVALIDATE METHOD');
    this.cachedImages[id] = undefined;
    return id;
  }

  private getImageFromCache(id: number): Image {
    return this.cachedImages[id];
  }
}
