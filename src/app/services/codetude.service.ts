import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Codetude } from '../models/codetude.model'

@Injectable({
  providedIn: 'root'
})
export class CodetudeService {
  private ENDPOINT: string = `${environment.backendApiBase}/codetudes`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Codetude[]> {
    return this.http.get<Codetude[]>(`${this.ENDPOINT}`);
  }

  public findOne(id: number): Observable<Codetude> {
    return this.http.get<Codetude>(`${this.ENDPOINT}/${id}`);
  }
}