import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Codetude } from '../models/codetude.model'

import { ServiceHelpers } from './service-helpers';

@Injectable({
  providedIn: 'root'
})
export class CodetudeService {
  private ENDPOINT: string = `${environment.backendApiBase}/codetudes`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Codetude[]> {
    let obs =  this.http.get<Codetude[]>(`${this.ENDPOINT}`);
    return ServiceHelpers.pipeJsonToModel<Codetude[]>(obs, Codetude);
  }

  findOne(id: number): Observable<Codetude> {
    let obs = this.http.get<Codetude>(`${this.ENDPOINT}/${id}`);
    return ServiceHelpers.pipeJsonToModel<Codetude>(obs, Codetude);
  }

  update(codetude: Codetude): Observable<Codetude> {
    let obs = this.http.patch<Codetude>(`${this.ENDPOINT}`, codetude, {});
    return ServiceHelpers.pipeJsonToModel<Codetude>(obs, Codetude);
  }

}
