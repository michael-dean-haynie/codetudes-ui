import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private ENDPOINT: string = `${environment.backendApiBase}/tags`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.ENDPOINT}`);
  }
}
