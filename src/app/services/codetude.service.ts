import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Codetude } from '../models/codetude.model'

@Injectable({
  providedIn: 'root'
})
export class CodetudeService {
  private token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUzNzU4MDM5MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.vZQkgXsGEmRgJuPNgFDsVVgwg39G5NqDe6Cdinxdrr0SJ3W5xqBzLhalWKVC9KfXdKPN-J8JjmUwEKX1qggysw';
  private ENDPOINT: string = `${environment.backendApiBase}/codetudes`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Codetude[]> {
    return this.http.get<Codetude[]>(`${this.ENDPOINT}`);
  }

  findOne(id: number): Observable<Codetude> {
    return this.http.get<Codetude>(`${this.ENDPOINT}/${id}`);
  }

  update(codetude: Codetude): Observable<Codetude> {
    return this.http.patch<Codetude>(`${this.ENDPOINT}`, codetude, 
      { headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+this.token
      })});
  }
}
