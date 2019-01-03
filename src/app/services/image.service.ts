import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Image } from '../models/image.model';
import { HttpClient } from '@angular/common/http';
import { ServiceHelpers } from './service-helpers';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private ENDPOINT = `${environment.backendApiBase}/images`;

  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<Image> {
    return ServiceHelpers.pipeJsonToModel<Image>(
      this.http.get<Image>(`${this.ENDPOINT}/${id}`),
      Image
    );
  }

  create(image: Image): Observable<Image> {
    return ServiceHelpers.pipeJsonToModel<Image>(
      this.http.post<Image>(`${this.ENDPOINT}`, image, {}),
      Image
    );
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.ENDPOINT}/${id}`);
  }
}
