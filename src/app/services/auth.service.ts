import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ENDPOINT: string = `${environment.backendApiBase}/login`;
  private TOKEN_KEY: string = 'authToken';

  constructor(private http: HttpClient) { }

  public userIsAdmin(): boolean {
    let result = false;

    let authToken = localStorage.getItem(this.TOKEN_KEY);
    if (authToken !== null) {
      let jwtHelper = new JwtHelperService();
      result = !jwtHelper.isTokenExpired(authToken);
    }

    return result;
  }

  public login(username: string, password: string): void {

    this.http.post<any>(`${this.ENDPOINT}`, null, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ':' + password),
      }),
      observe: 'response'
    }).subscribe(
      response => {
        const authHeader = response.headers.get('Authorization');
        const authToken = authHeader.replace("Bearer ", ""); 
        localStorage.setItem(this.TOKEN_KEY, authToken);
      },
      error => { console.log('Something went wrong!'); }/*,
      () => { console.log("User successfully authenticated: " + this.userIsAdmin()); }*/
    );
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}