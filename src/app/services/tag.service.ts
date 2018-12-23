import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

import { ServiceHelpers } from './service-helpers';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private ENDPOINT = `${environment.backendApiBase}/tags`;

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Tag[]> {
    const obs = this.http.get<Tag[]>(`${this.ENDPOINT}`);
    return ServiceHelpers.pipeJsonToModel<Tag[]>(obs, Tag);
  }

  update(tag: Tag): Observable<Tag> {
    const obs = this.http.patch<Tag>(`${this.ENDPOINT}`, tag, {});
    return ServiceHelpers.pipeJsonToModel<Tag>(obs, Tag);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.ENDPOINT}/${id}`);
  }

  create(name: string): Observable<Tag> {
    const obs = this.http.post<Tag>(`${this.ENDPOINT}`, { name: name });
    return ServiceHelpers.pipeJsonToModel<Tag>(obs, Tag);
  }
}
